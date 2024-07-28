import React from "react";
import Filters from "./Filters";
import Transforms from "./Transforms";

const Sidebar = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
  handleRotate,
}) => {
  // console.log(sliderValues);
  return (
    <>
      {/* <Filters
        sliderValues={sliderValues}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setSliderValue={setSliderValue}
      /> */}
      <Transforms handleRotate={handleRotate} />
    </>
  );
};

export default Sidebar;
