import React from "react";
import { useState } from "react";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";

const Transforms = ({ handleRotate }) => {
  const [accordionOpen, setaccordionOpen] = useState(false);

  const Transform = ({ activeTransformIcon, activeTransform }) => {
    return (
      <button
        onClick={() => handleRotate(activeTransform)}
        className="mx-auto mb-2 rounded-lg border-2 border-black px-12 py-6 text-3xl font-bold capitalize transition-all hover:bg-[#393E46] hover:text-[#EEEEEE] active:bg-[#222831]"
      >
        {activeTransformIcon}
      </button>
    );
  };

  return (
    <div className="flex w-[90%] flex-col">
      <button
        onClick={() => setaccordionOpen(!accordionOpen)}
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
        className={`flex flex-col overflow-hidden px-2 transition-all duration-300 ease-in-out ${accordionOpen ? "block" : "hidden"}`}
      >
        <Transform
          activeTransform="left"
          activeTransformIcon={<FaArrowRotateLeft />}
        />
        <Transform
          activeTransform="right"
          activeTransformIcon={<FaArrowRotateRight />}
        />
        <Transform
          activeTransform="horizontal"
          activeTransformIcon={<LuFlipHorizontal2 />}
        />
        <Transform
          activeTransform="vertical"
          activeTransformIcon={<LuFlipVertical2 />}
        />
      </div>
    </div>
  );
};

export default Transforms;
