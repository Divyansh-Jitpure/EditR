import React, { useState, useRef, useEffect } from "react";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";

const Transform = ({ handleRotate, activeTransform, activeTransformIcon }) => {
  return (
    <button
      onClick={() => handleRotate(activeTransform)}
      className="mx-auto mb-2 rounded-lg border-2 border-black px-12 py-6 text-3xl font-bold capitalize transition-all hover:bg-[#393E46] hover:text-[#EEEEEE] active:bg-[#222831]"
    >
      {activeTransformIcon}
    </button>
  );
};

const Transforms = ({ handleRotate }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  useEffect(() => {
    if (accordionOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [accordionOpen]);

  return (
    <div className="mb-12 flex w-[90%] flex-col">
      <button
        onClick={toggleAccordion}
        className="mb-3 mt-1 flex items-center justify-between border-y-2 border-black py-2 text-center text-3xl font-medium"
      >
        <span>Transform</span>
        <svg
          className="shrink-0 fill-black"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center transform transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transform transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="transition-max-height flex max-h-0 flex-col overflow-hidden px-2 duration-300 ease-in-out"
      >
        <Transform
          handleRotate={handleRotate}
          activeTransform="left"
          activeTransformIcon={<FaArrowRotateLeft />}
        />
        <Transform
          handleRotate={handleRotate}
          activeTransform="right"
          activeTransformIcon={<FaArrowRotateRight />}
        />
        <Transform
          handleRotate={handleRotate}
          activeTransform="horizontal"
          activeTransformIcon={<LuFlipHorizontal2 />}
        />
        <Transform
          handleRotate={handleRotate}
          activeTransform="vertical"
          activeTransformIcon={<LuFlipVertical2 />}
        />
      </div>
    </div>
  );
};

export default Transforms;
