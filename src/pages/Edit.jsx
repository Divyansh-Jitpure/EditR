import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

const Edit = () => {
  const [brightness, setBrightness] = useState("100");
  const [contrast, setContrast] = useState("100");
  const [grayscale, setGrayscale] = useState("0");
  const [invert, setInvert] = useState("0");
  const [hueRotate, setHueRotate] = useState("100");
  const [saturate, setSaturate] = useState("100");
  const [sepia, setSepia] = useState("100");

  const [sliderValue, setSliderValue] = useState(100);

  const [activeFilter, setActiveFilter] = useState("brightness");

  const imageRef = useRef("");

  let file = useLocation().state.file;

  const applyFilter = () => {
    imageRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%)`;
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
      case "hueRotate":
        setHueRotate(e.target.value);
        break;
      case "saturate":
        setSaturate(e.target.value);
        break;
      default:
        setSepia(e.target.value);
    }
  };

  return (
    <div className="flex items-center">
      <Sidebar
        setActiveFilter={setActiveFilter}
        setSliderValue={setSliderValue}
      />

      <div className="mx-auto w-1/5 flex-col">
        {file && (
          <img
            ref={imageRef}
            src={URL.createObjectURL(file)}
            alt=""
            onLoad={applyFilter}
          />
        )}
      </div>
      <input
        className="mx-24"
        type="range"
        min="0"
        max={
          activeFilter === "brightness" || activeFilter === "saturate"
            ? "200"
            : "100"
        }
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Edit;
