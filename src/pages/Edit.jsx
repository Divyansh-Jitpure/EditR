import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileTools from "../components/MobileTools";
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
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const angle = (rotate * Math.PI) / 180;

      // Calculate the new canvas dimensions based on the rotated image
      const newWidth =
        Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle));
      const newHeight =
        Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%) ${exposureFilter} ${vibranceFilter}`;
      ctx.translate(newWidth / 2, newHeight / 2);
      if (rotate !== 0) {
        ctx.rotate(angle);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(image, -width / 2, -height / 2, width, height);

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
      <h1 className="pointer-events-none absolute right-4 top-3 mb-14 hidden text-4xl font-semibold tracking-tighter text-[#00ADB5] md:block">
        {"< EditR / >"}
      </h1>

      <div className="mx-auto flex h-screen w-full flex-col items-center justify-between bg-gradient-to-t from-[rgba(57,62,70,1)] to-[rgba(57,62,70)]">
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
            onClick={saveImage}
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

        <div className="flex flex-col items-center justify-between rounded-lg px-4 py-3 md:bg-[#757f8e68] md:pb-5 md:pt-3">
          <div className="hidden w-60 justify-between pb-1 text-xl font-medium capitalize text-[#EEEEEE] md:flex">
            <span>{activeFilter}</span>
            <span>{sliderValue}%</span>
          </div>
          <input
            className="slider h-2 w-72 cursor-pointer rounded-lg md:mt-3"
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
        <MobileTools
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setSliderValue={setSliderValue}
          handleRotate={handleRotate}
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
      </div>
      <button
        onClick={resetFilter}
        className="absolute bottom-24 right-10 hidden rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#00f2ff] active:bg-[#393E46] md:block"
      >
        Reset Filters
      </button>
      <button
        onClick={saveImage}
        className="absolute bottom-9 right-10 hidden rounded-lg border-[1px] border-[#00ADB5] px-6 py-2 text-xl font-medium text-[#EEEEEE] shadow-md shadow-[#00ADB5] transition hover:bg-[#222831] hover:text-[#4ff6ff] active:bg-[#393E46] md:block"
      >
        Save Image
      </button>
    </div>
  );
};

export default Edit;
