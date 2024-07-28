import React from "react";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";

const Transforms = ({ handleRotate }) => {
  const Transform = ({ activeTransformIcon, activeTransform }) => {
    return (
      <button
        onClick={() => handleRotate(activeTransform)}
        className="mx-auto mb-2 rounded-lg border border-black px-12 py-5 text-3xl font-medium capitalize transition-all hover:bg-[#393E46] hover:text-[#EEEEEE] active:bg-[#222831]"
      >
        {activeTransformIcon}
      </button>
    );
  };

  return (
    <div
      style={{
        backgroundImage:
          "background-image: linear-gradient( 179deg,  rgba(0,173,181,1) 2.9%, rgba(255,255,255,1) 111.7% )",
      }}
      className="flex h-screen w-fit flex-col overflow-auto border border-black"
    >
      <h2 className="mb-3 border-b border-black py-2 text-center text-3xl font-medium">
        Rotate & Flip
      </h2>
      <Transform
        activeTransform="left"
        activeTransformIcon={<FaArrowRotateLeft />}
      />
      <Transform
        activeTransform="right"
        activeTransformIcon={<FaArrowRotateRight />}
      />
      <Transform
        activeTransform="horizontal"
        activeTransformIcon={<LuFlipHorizontal2 />}
      />
      <Transform
        activeTransform="vertical"
        activeTransformIcon={<LuFlipVertical2 />}
      />
    </div>
  );
};

export default Transforms;
