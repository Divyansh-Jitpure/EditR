import React from "react";

const Slider = ({
  activeFilter,
  sliderValue,
  sliderRef,
  handleSliderChange,
  wheelControl,
}) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg px-4 py-3 md:bg-[#757f8e68] md:pb-5 md:pt-3">
      <div className="hidden w-60 justify-between pb-1 text-xl font-medium capitalize text-[#EEEEEE] md:flex">
        <span>{activeFilter}</span>
        <span>{sliderValue}%</span>
      </div>
      <input
        className="slider h-2 w-72 cursor-pointer rounded-lg md:mt-3"
        type="range"
        name="slider"
        min="0"
        max={
          activeFilter === "brightness" ||
          activeFilter === "contrast" ||
          activeFilter === "saturate" ||
          activeFilter === "exposure" ||
          activeFilter === "vibrance"
            ? "200"
            : "100"
        }
        ref={sliderRef}
        value={sliderValue}
        onChange={handleSliderChange}
        onWheel={wheelControl}
      />
    </div>
  );
};

export default Slider;
