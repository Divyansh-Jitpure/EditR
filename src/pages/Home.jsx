import React, { useRef } from "react";
import { IoImagesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

// Home Page
const Home = () => {
  const navigate = useNavigate();

  // Image ref of file Input
  const imgRef = useRef();

  // Load image function that gets image from file input and sends it to Edit Page
  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    navigate("/edit", { state: { file } });
  };

  return (
    // Home Div
    <div className="flex h-screen flex-col items-center justify-center bg-home-bg bg-cover bg-center">
      <title>EditR - Image Editor</title>
      {/* Title */}
      <h1 className="mb-14 text-5xl font-semibold tracking-tighter text-[#00ADB5]">
        {"< EditR / >"}
      </h1>

      {/* Choose Image button Div */}
      <div className="h-60 w-60 overflow-hidden rounded-lg bg-[#222831] shadow-lg shadow-slate-600">
        {/* File input to choose image from local device */}
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          onChange={loadImage}
          hidden
        />

        {/* Button linked with file input above with ref */}
        <button
          className="group relative h-full w-full overflow-hidden"
          onClick={() => {
            imgRef.current.click();
            logEvent(analytics);
          }}
        >
          {/* Photo Icon */}
          <IoImagesSharp className="mx-auto text-9xl text-[#cecece] transition-all group-hover:text-[#EEEEEE]" />
          {/* Wave animation Div */}
          <div className="wave absolute left-0 top-full h-full w-full opacity-0 group-hover:top-44 group-hover:opacity-100"></div>
        </button>
      </div>
      {/* Kinda a lable for above input */}
      <h2 className="my-5 text-3xl font-medium text-[#393E46]">
        Choose an Image to Edit
      </h2>
    </div>
  );
};

export default Home;
