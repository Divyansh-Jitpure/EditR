import React from "react";

const Sidebar = ({ setActiveFilter, setSliderValue }) => {
  return (
    <div className="flex flex-col w-fit h-screen border-black border">
      <button
        onClick={() => {
          setActiveFilter("brightness"), setSliderValue("100");
        }}
        className="px-4 mb-1 py-8 border-black border-b focus:bg-black focus:text-white hover:bg-black hover:text-white"
      >
        Brightness
      </button>
      <button
        onClick={() => {
          setActiveFilter("saturate"), setSliderValue("100");
        }}
        className="px-4 my-1 py-8 border-black border-y focus:bg-black focus:text-white hover:bg-black hover:text-white"
      >
        Saturation
      </button>
      <button className="px-4 my-1 py-8 border-black border-y focus:bg-black focus:text-white hover:bg-black hover:text-white">
        Inversion
      </button>
      <button className="px-4 my-1 py-8 border-black border-y focus:bg-black focus:text-white hover:bg-black hover:text-white">
        Grayscale
      </button>
    </div>
  );
};

export default Sidebar;
