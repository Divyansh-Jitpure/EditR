import React from "react";

const MobileFilters = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  const btnStyles =
    "mx-1 w-32 rounded-lg border-2 border-black bg-[#222831] py-4 text-xl font-medium capitalize text-[#EEEEEE]";

  const activeStyles =
    "mx-1 w-32 rounded-lg border-2 border-black bg-[#EEEEEE] py-4 text-xl font-medium capitalize";

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
    <div className="w-screen overflow-x-auto whitespace-nowrap">
      <Filter filter="exposure" sliderValue={sliderValues.exposure} />
      <Filter filter="brightness" sliderValue={sliderValues.brightness} />
      <Filter filter="contrast" sliderValue={sliderValues.contrast} />
      <Filter filter="saturate" sliderValue={sliderValues.saturate} />
      <Filter filter="vibrance" sliderValue={sliderValues.vibrance} />
      <Filter filter="sepia" sliderValue={sliderValues.sepia} />
      <Filter filter="invert" sliderValue={sliderValues.invert} />
      <Filter filter="grayscale" sliderValue={sliderValues.grayscale} />
    </div>
  );
};

export default MobileFilters;
