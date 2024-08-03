import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileTools from "../components/MobileTools";
import { saveImage, resetSlider } from "../utils";
import Slider from "../components/Slider";

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

  // Transform States
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);

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
  let fileNameExt = file.name;
  let fileName = file.name.split("."); //filename fetched from file object

  let customFilters = { exposureFilter, vibranceFilter };

  let transformValues = { rotate, flipHorizontal, flipVertical };

  // sliderValues
  let sliderValues = {
    brightness,
    contrast,
    grayscale,
    invert,
    saturate,
    sepia,
    exposure,
    vibrance,
  };

  // ApplyFilter function that has all the preset css filters with dynamic filter states values
  const applyFilter = () => {
    imageRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%) ${exposureFilter} ${vibranceFilter}`;
    imageRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
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
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
  };

  // This useEffect is running resetSlider function whenever resetFilter function is triggering
  useEffect(() => {
    resetSlider(sliderValues, activeFilter, setSliderValue);
  }, [resetFilter]);

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

  // Handles mouse wheel control
  const wheelControl = (e) => {
    if (e.deltaY < 0) {
      sliderRef.current.valueAsNumber += 3;
    } else {
      sliderRef.current.valueAsNumber -= 3;
    }
    handleSliderChange(e);
  };

  // Handles Exposure Filter change
  useEffect(() => {
    setExposureFilter(
      `brightness(${Number(exposure) + 0.2}%) contrast(${Number(exposure) + 0.1}%) saturate(${Number(exposure) + 0.05}%)`,
    );
  }, [handleSliderChange]);

  // Handles Vibrance Filter change
  useEffect(() => {
    setVibranceFilter(
      `brightness(${Number(vibrance) + 0.1}%) contrast(${Number(vibrance) + 0.1}%) saturate(${Number(vibrance) + 0.2}%)`,
    );
  }, [handleSliderChange]);

  // Handles Transforms
  const handleRotate = (activeTransform) => {
    if (activeTransform === "left") {
      setRotate(rotate - 90);
    } else if (activeTransform === "right") {
      setRotate(rotate + 90);
    } else if (activeTransform === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
  };

  return (
    // Edit Component
    <div className="flex items-center overflow-hidden">
      <title>
        EditR -{" "}
        {fileName[0].length > 10
          ? fileName[0].slice(0, 10) + `.......  .` + fileName[1]
          : fileNameExt}
      </title>
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setSliderValue={setSliderValue}
        handleRotate={handleRotate}
        sliderValues={sliderValues}
      />
      <h1 className="pointer-events-none absolute right-4 top-3 mb-14 hidden text-4xl font-semibold tracking-tighter text-[#00ADB5] md:block">
        {"< EditR / >"}
      </h1>

      <div className="mx-auto flex h-screen w-full flex-col items-center justify-between bg-gradient-to-t from-[rgba(57,62,70,1)] to-[rgba(57,62,70)] md:justify-around">
        <div className="mt-2 flex w-full justify-between md:hidden">
          <button
            onClick={resetFilter}
            className="ml-3 mt-10 text-3xl text-slate-300"
          >
            Reset
          </button>
          <h1 className="text-4xl font-semibold tracking-tighter text-[#00ADB5]">
            {"< EditR / >"}
          </h1>
          <button
            onClick={() =>
              saveImage(
                file,
                fileName,
                sliderValues,
                customFilters,
                transformValues,
              )
            }
            className="mr-3 mt-10 text-3xl text-slate-300"
          >
            Save
          </button>
        </div>
        <div className="">
          {file && (
            <img
              className="mx-auto max-h-[400px] object-contain md:max-h-[500px] xl:max-w-[80%] 2xl:max-w-full"
              ref={imageRef}
              src={URL.createObjectURL(file)}
              onLoad={applyFilter}
            />
          )}
        </div>

        <Slider
          activeFilter={activeFilter}
          sliderValue={sliderValue}
          sliderRef={sliderRef}
          handleSliderChange={handleSliderChange}
          wheelControl={wheelControl}
        />

        <MobileTools
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setSliderValue={setSliderValue}
          handleRotate={handleRotate}
          sliderValues={sliderValues}
        />
      </div>
      <button
        onClick={resetFilter}
        className="absolute bottom-24 right-10 hidden rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#00f2ff] active:bg-[#393E46] md:block"
      >
        Reset Filters
      </button>
      <button
        onClick={() =>
          saveImage(
            file,
            fileName,
            sliderValues,
            customFilters,
            transformValues,
          )
        }
        className="absolute bottom-9 right-10 hidden rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#4ff6ff] active:bg-[#393E46] md:block"
      >
        Save Image
      </button>
    </div>
  );
};

export default Edit;
