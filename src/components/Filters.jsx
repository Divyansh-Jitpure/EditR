import React, { useState } from "react";

const Filters = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  const [accordionOpen, setaccordionOpen] = useState(false);

  const btnStyles =
    "rounded-lg transition-all text-xl font-medium mb-2 mx-3 py-7 border-black border-2 hover:bg-[#393E46] hover:text-[#EEEEEE] capitalize";

  const activeStyles =
    "rounded-lg transition-all text-xl font-medium mb-2 mx-3 py-7 border-black border bg-[#222831] text-white hover:bg-[#222831] hover:text-[#EEEEEE] capitalize";

  const Filter = (props) => {
    return (
      <button
        onClick={() => {
          setActiveFilter(props.filter), setSliderValue(props.sliderValue);
        }}
        className={activeFilter === props.filter ? activeStyles : btnStyles}
      >
        {props.filter}
      </button>
    );
  };

  return (
    <div className="flex w-[90%] flex-col">
      <button
        onClick={() => setaccordionOpen(!accordionOpen)}
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
        className={`flex flex-col overflow-hidden px-2 transition-all duration-300 ease-in-out ${accordionOpen ? "block" : "hidden"}`}
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
