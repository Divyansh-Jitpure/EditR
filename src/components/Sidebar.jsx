import React from "react";

const Sidebar = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  // console.log(sliderValues);
  const btnStyles =
    "rounded-lg transition-all text-lg font-medium mb-2 mx-3 py-7 border-black border hover:bg-[#393E46] hover:text-[#EEEEEE] capitalize";

  const activeStyles =
    "rounded-lg transition-all text-lg font-medium mb-2 mx-3 py-7 border-black border bg-[#222831] text-white hover:bg-[#222831] hover:text-[#EEEEEE] capitalize";

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
    <div
      style={{
        backgroundImage:
          "background-image: linear-gradient( 179deg,  rgba(0,173,181,1) 2.9%, rgba(255,255,255,1) 111.7% )",
      }}
      className="flex h-screen w-52 flex-col overflow-auto border border-black"
    >
      <h2 className="mb-3 border-b border-black py-2 text-center text-3xl font-medium">
        Filters
      </h2>
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

export default Sidebar;
