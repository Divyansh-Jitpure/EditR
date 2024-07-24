import React, { useRef, useState } from "react";
import { IoImagesSharp } from "react-icons/io5";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const imgRef = useRef();

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    navigate("/edit", { state: { file: file } });
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-14 text-5xl font-semibold tracking-tighter text-[#222831]">
        {"< EditR / >"}
      </h1>
      <div className="group h-60 w-60 rounded-lg border-2 border-black bg-[#222831] shadow-lg shadow-slate-600 transition-all hover:h-64 hover:w-64 hover:bg-slate-300 active:bg-[#222831]">
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          onChange={loadImage}
          hidden
        />
        <button
          className="flex h-full w-full items-center justify-center transition-all"
          onClick={() => imgRef.current.click()}
        >
          <IoImagesSharp className="text-9xl text-slate-300 group-hover:text-[#222831] group-active:text-slate-300" />
        </button>
      </div>
      <h2 className="my-5 text-3xl font-medium text-[#393E46]">
        Choose an Image to Edit
      </h2>
      {/* {previewImg && <img src={URL.createObjectURL(previewImg)} alt="" />} */}
    </div>
  );
};

export default Home;
