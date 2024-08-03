// SaveImage function renders the Edited image with canvas api drawImage and other features and then downloading it
export const saveImage = (
  file,
  fileName,
  sliderValues,
  customFilters,
  transformValues,
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();

  image.onload = () => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const angle = (transformValues.rotate * Math.PI) / 180;

    // Calculate the new canvas dimensions based on the rotated image
    const newWidth =
      Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle));
    const newHeight =
      Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Apply filters and transforms
    ctx.filter = `brightness(${sliderValues.brightness}%) contrast(${sliderValues.contrast}%) grayscale(${sliderValues.grayscale}%) invert(${sliderValues.invert}%) saturate(${sliderValues.saturate}%) sepia(${sliderValues.sepia}%) ${customFilters.exposureFilter} ${customFilters.vibranceFilter}`;
    ctx.translate(newWidth / 2, newHeight / 2);
    if (transformValues.rotate !== 0) {
      ctx.rotate(angle);
    }
    ctx.scale(transformValues.flipHorizontal, transformValues.flipVertical);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);

    // Download Image
    const link = document.createElement("a");
    link.download = `${fileName[0]} - Edited with EditR.${fileName[1]}`;
    link.href = canvas.toDataURL();
    link.click();
  };

  image.src = URL.createObjectURL(file);
};

// resetSlider function resets the slider value after resetFiter function runs
export const resetSlider = (
  {
    brightness,
    contrast,
    grayscale,
    invert,
    saturate,
    sepia,
    exposure,
    vibrance,
  },
  activeFilter,
  setSliderValue,
) => {
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
