import React from "react";

const Sidebar = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
}) => {
  const btnStyles =
    "rounded-lg transition-all mt-2 mx-3 py-8 border-black border hover:bg-[#393E46] hover:text-white";

  const activeStyles =
    "rounded-lg transition-all mt-2 mx-3 py-8 border-black border bg-[#222831] text-white hover:bg-[#222831] hover:text-white";

  return (
    <div className="bg-[#00ADB5] flex flex-col h-screen border-black border w-48 overflow-auto">
      <h2 className="text-center text-2xl font-medium py-2 border-black border-b">
        Filters
      </h2>
      <button
        onClick={() => {
          setActiveFilter("brightness"),
            setSliderValue(sliderValues.brightness);
        }}
        className={activeFilter === "brightness" ? activeStyles : btnStyles}
      >
        Brightness
      </button>
      <button
        onClick={() => {
          setActiveFilter("contrast"), setSliderValue(sliderValues.contrast);
        }}
        className={activeFilter === "contrast" ? activeStyles : btnStyles}
      >
        Contrast
      </button>
      <button
        onClick={() => {
          setActiveFilter("grayscale"), setSliderValue(sliderValues.grayscale);
        }}
        className={activeFilter === "grayscale" ? activeStyles : btnStyles}
      >
        Grayscale
      </button>
      <button
        onClick={() => {
          setActiveFilter("invert"), setSliderValue(sliderValues.invert);
        }}
        className={activeFilter === "invert" ? activeStyles : btnStyles}
      >
        Invert
      </button>
      <button
        onClick={() => {
          setActiveFilter("saturate"), setSliderValue(sliderValues.saturate);
        }}
        className={activeFilter === "saturate" ? activeStyles : btnStyles}
      >
        Saturate
      </button>
      <button
        onClick={() => {
          setActiveFilter("sepia"), setSliderValue(sliderValues.sepia);
        }}
        className={activeFilter === "sepia" ? activeStyles : btnStyles}
      >
        Sepia
      </button>
    </div>
  );
};

export default Sidebar;
