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

    // resetFilter();
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="border-2 w-72 h-72 border-black">
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          onChange={loadImage}
          hidden
        />
        <button
          className="w-full h-full flex justify-center items-center"
          onClick={() => imgRef.current.click()}
        >
          <IoImagesSharp className="text-9xl" />
        </button>
      </div>
      <h2 className="text-2xl my-5">Choose an Image to Edit</h2>
      {/* {previewImg && <img src={URL.createObjectURL(previewImg)} alt="" />} */}
    </div>
  );
};

export default Home;
