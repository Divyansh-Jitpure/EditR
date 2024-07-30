import React, { useState, useRef, useEffect } from "react";

const Filters = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const contentRef = useRef(null);

  const btnStyles =
    "rounded-lg transition-all text-xl w-32 font-medium mb-2 mx-3 py-7 border-black border-2 hover:bg-[#393E46] hover:text-[#EEEEEE] capitalize";

  const activeStyles =
    "rounded-lg transition-all text-xl w-32 font-medium mb-2 mx-3 py-7 border-black  border bg-[#222831] text-white hover:bg-[#222831] hover:text-[#EEEEEE] capitalize";

  const Filter = (props) => {
    return (
      <button
        onClick={() => {
          setActiveFilter(props.filter);
          setSliderValue(props.sliderValue);
        }}
        className={activeFilter === props.filter ? activeStyles : btnStyles}
      >
        {props.filter}
      </button>
    );
  };

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
    <div className="flex w-[90%] flex-col">
      <button
        onClick={toggleAccordion}
        className="mb-3 mt-1 flex items-center justify-between border-y-2 border-black py-2 text-center text-3xl font-medium"
      >
        <span>Filters</span>
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
        className="transition-max-height flex max-h-0 flex-col overflow-hidden px-2 duration-300 ease-in"
      >
        <Filter filter="exposure" sliderValue={sliderValues.exposure} />
        <Filter filter="brightness" sliderValue={sliderValues.brightness} />
        <Filter filter="contrast" sliderValue={sliderValues.contrast} />
        <Filter filter="saturate" sliderValue={sliderValues.saturate} />
        <Filter filter="vibrance" sliderValue={sliderValues.vibrance} />
        <Filter filter="sepia" sliderValue={sliderValues.sepia} />
        <Filter filter="invert" sliderValue={sliderValues.invert} />
        <Filter filter="grayscale" sliderValue={sliderValues.grayscale} />
      </div>
    </div>
  );
};

export default Filters;
