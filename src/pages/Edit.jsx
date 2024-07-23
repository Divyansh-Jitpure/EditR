import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

const Edit = () => {
  const [brightness, setBrightness] = useState("100");
  const [contrast, setContrast] = useState("100");
  const [grayscale, setGrayscale] = useState("0");
  const [invert, setInvert] = useState("0");
  const [saturate, setSaturate] = useState("100");
  const [sepia, setSepia] = useState("0");

  const [sliderValue, setSliderValue] = useState(100);

  const [activeFilter, setActiveFilter] = useState("brightness");

  const imageRef = useRef("");

  let file = useLocation().state.file;

  const applyFilter = () => {
    imageRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%)`;
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    switch (activeFilter) {
      case "brightness":
        setBrightness(e.target.value);
        break;
      case "contrast":
        setContrast(e.target.value);
        break;
      case "grayscale":
        setGrayscale(e.target.value);
        break;
      case "invert":
        setInvert(e.target.value);
        break;
      case "saturate":
        setSaturate(e.target.value);
        break;
      default:
        setSepia(e.target.value);
    }
  };

  return (
    <div className="flex items-center overflow-hidden">
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setSliderValue={setSliderValue}
        sliderValues={{
          brightness,
          contrast,
          grayscale,
          invert,
          saturate,
          sepia,
        }}
      />
      <div className="bg-[#393E46] mx-auto flex flex-col items-center h-screen w-full ">
        <div className="m-auto">
          {file && (
            <img
              className="max-w-2xl max-h-[450px] w-full h-full object-contain"
              ref={imageRef}
              src={URL.createObjectURL(file)}
              onLoad={applyFilter}
            />
          )}
        </div>
        <input
          className="my-10 w-72 h-2 bg-[#EEEEEE] rounded-lg appearance-none cursor-pointer"
          type="range"
          min="0"
          max={
            activeFilter === "brightness" ||
            activeFilter === "contrast" ||
            activeFilter === "saturate"
              ? "200"
              : "100"
          }
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default Edit;
