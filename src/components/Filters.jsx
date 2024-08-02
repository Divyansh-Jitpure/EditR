import { React, useRef } from "react";
import Accordion from "./Accordion";

// Filters Comonent
const Filters = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  const contentRef = useRef(null);

  // Btn Styles
  const btnStyles =
    "rounded-lg transition-all text-xl w-32 font-medium mb-2 mx-3 py-7 border-black border-2 hover:bg-[#393E46] hover:text-[#EEEEEE] capitalize";
  // Active Btn Styles
  const activeStyles =
    "rounded-lg transition-all text-xl w-32 font-medium mb-2 mx-3 py-7 border-black border bg-[#222831] text-white hover:bg-[#222831] hover:text-[#EEEEEE] capitalize";

  // Filter Comonent
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

  return (
    // Filter Component
    <div className="flex w-[90%] flex-col">
      {/* Accordion */}
      <Accordion title="Filters" targetRef={contentRef} />
      {/* Target Content */}
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
