import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

const Edit = () => {
  const [brightness, setBrightness] = useState("100");
  const [contrast, setContrast] = useState("100");
  const [saturate, setSaturate] = useState("100");
  const [sepia, setSepia] = useState("0");
  const [invert, setInvert] = useState("0");
  const [grayscale, setGrayscale] = useState("0");

  const [sliderValue, setSliderValue] = useState(100);

  const [activeFilter, setActiveFilter] = useState("brightness");

  const imageRef = useRef();

  let file = useLocation().state.file;

  const applyFilter = () => {
    imageRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%)`;
  };

  const resetSlider = () => {
    switch (activeFilter) {
      case "brightness":
        setSliderValue(brightness);
        break;
      case "contrast":
        setSliderValue(contrast);
        break;
      case "grayscale":
        setSliderValue(grayscale);
        break;
      case "invert":
        setSliderValue(invert);
        break;
      case "saturate":
        setSliderValue(saturate);
        break;
      default:
        setSliderValue(sepia);
    }
  };

  const resetFilter = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setInvert(0);
    setSaturate(100);
    setSepia(0);
  };

  useEffect(() => {
    resetSlider();
  }, [resetFilter]);

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
      <h1 className="pointer-events-none absolute right-4 top-3 mb-14 text-4xl font-semibold tracking-tighter text-[#00ADB5]">
        {"< EditR / >"}
      </h1>
      <div
        style={{
          backgroundImage:
            "radial-gradient( circle farthest-corner at 0.5% 2%,  rgba(57,62,70,1) 0%, rgba(57,62,70,0.81) 90% )",
        }}
        className="mx-auto flex h-screen w-full flex-col items-center"
      >
        <div className="m-auto">
          {file && (
            <img
              className="h-full max-h-[450px] w-full max-w-2xl object-contain"
              ref={imageRef}
              src={URL.createObjectURL(file)}
              onLoad={applyFilter}
            />
          )}
        </div>
        <div className="my-5 flex w-60 justify-between text-xl font-medium capitalize text-[#EEEEEE]">
          <span>{activeFilter}</span>
          <span>{sliderValue}%</span>
        </div>
        <input
          className="slider mb-9 h-2 w-72 cursor-pointer rounded-lg bg-[#EEEEEE]"
          type="range"
          name="slider"
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
      <button
        onClick={resetFilter}
        className="absolute bottom-16 right-10 rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#00f2ff] active:bg-[#393E46]"
      >
        Reset Filters
      </button>
      {/* <button
        // onClick={resetFilter}
        className="absolute bottom-16 right-10 rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#4ff6ff] active:bg-[#393E46]"
      >
        Save Image
      </button> */}
    </div>
  );
};

export default Edit;
