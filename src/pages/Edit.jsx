import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// Edit Section on Editing page
const Edit = () => {
  // Filter States
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [exposure, setExposure] = useState(100);
  const [vibrance, setVibrance] = useState(100);

  // Custom Filter States
  const [exposureFilter, setExposureFilter] = useState("");
  const [vibranceFilter, setVibranceFilter] = useState("");

  // Slider Value state
  const [sliderValue, setSliderValue] = useState(100);

  // Active filter state
  const [activeFilter, setActiveFilter] = useState("exposure");

  // Refs for image and slider
  const imageRef = useRef();
  const sliderRef = useRef();

  // file object aka the image state sent by Home page
  let file = useLocation().state.file;
  let fileName = file.name.split("."); //filename fetched from file object

  // ApplyFilter function that has all the preset css filters with dynamic filter states values
  const applyFilter = () => {
    imageRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%) ${exposureFilter} ${vibranceFilter}`;
  };

  // resetFilter function resets all the filter values back to initial values
  const resetFilter = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setInvert(0);
    setSaturate(100);
    setSepia(0);
    setExposure(100);
    setVibrance(100);
  };

  // resetSlider function resets the slider value after resetFiter function runs
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
      case "exposure":
        setSliderValue(exposure);
        break;
      case "vibrance":
        setSliderValue(vibrance);
        break;
      default:
        setSliderValue(sepia);
    }
  };

  // This useEffect is running resetSlider function whenever resetFilter function is triggering
  useEffect(() => {
    resetSlider();
  }, [resetFilter]);

  // SaveImage function renders the Edited image with canvas api drawImage and other features and then downloading it
  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%) ${exposureFilter} ${vibranceFilter}`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height,
      );

      const link = document.createElement("a");
      link.download = `${fileName[0]} - Edited with EditR.${fileName[1]}`;
      link.href = canvas.toDataURL();
      link.click();
    };

    image.src = URL.createObjectURL(file);
  };

  // handleSliderChange function sets the values for slider value state and filter states onChange of the slider
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
      case "exposure":
        setExposure(e.target.value);
        break;
      case "vibrance":
        setVibrance(e.target.value);
        break;
      default:
        setSepia(e.target.value);
    }
  };

  const wheelControl = (e) => {
    if (e.deltaY < 0) {
      sliderRef.current.valueAsNumber += 3;
    } else {
      sliderRef.current.valueAsNumber -= 3;
    }

    handleSliderChange(e);
  };

  useEffect(() => {
    setExposureFilter(
      `brightness(${Number(exposure) + 0.2}%) contrast(${Number(exposure) + 0.1}%) saturate(${Number(exposure) + 0.05}%)`,
    );
  }, [handleSliderChange]);

  useEffect(() => {
    setVibranceFilter(
      `brightness(${Number(vibrance) + 0.1}%) contrast(${Number(vibrance) + 0.1}%) saturate(${Number(vibrance) + 0.2}%)`,
    );
  }, [handleSliderChange]);

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
          exposure,
          vibrance,
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
        <span
          onClick={resetFilter}
          className="my-3 w-fit rounded-lg border-x-2 border-b-4 border-[#00ADB5] p-2 text-center text-xl font-medium text-[#EEEEEE] transition"
        >
          {fileName[0] + "." + fileName[1]}
        </span>
        <div className="m-auto">
          {file && (
            <img
              className="mx-auto h-full max-h-[450px] object-contain xl:max-w-[90%] 2xl:max-w-full"
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
      <button
        onClick={resetFilter}
        className="absolute bottom-32 right-10 rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#00f2ff] active:bg-[#393E46]"
      >
        Reset Filters
      </button>
      <button
        onClick={saveImage}
        className="absolute bottom-16 right-10 rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#4ff6ff] active:bg-[#393E46]"
      >
        Save Image
      </button>
    </div>
  );
};

export default Edit;
