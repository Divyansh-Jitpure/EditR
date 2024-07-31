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
  return (
    <div className="hidden h-screen w-60 flex-col items-center overflow-auto bg-gradient-to-t from-[#429195] to-[#00f2ff] md:flex">
      <h2 className="my-4 text-3xl font-medium">Tools</h2>
      <Filters
        sliderValues={sliderValues}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setSliderValue={setSliderValue}
      />

      <Transforms handleRotate={handleRotate} />
    </div>
  );
};

export default Sidebar;
