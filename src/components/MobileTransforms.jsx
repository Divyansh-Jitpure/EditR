import React from "react";
import "../trans.css";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";

const Transform = ({ handleRotate, activeTransform, activeTransformIcon }) => {
  return (
    <button
      onClick={() => handleRotate(activeTransform)}
      className="mx-5 h-10 text-5xl text-white transition-all"
    >
      {activeTransformIcon}
    </button>
  );
};

const MobileTransforms = ({ handleRotate }) => {
  return (
    <div className="w-screen overflow-x-auto whitespace-nowrap">
      <Transform
        handleRotate={handleRotate}
        activeTransform="left"
        activeTransformIcon={<FaArrowRotateLeft />}
      />
      <Transform
        handleRotate={handleRotate}
        activeTransform="right"
        activeTransformIcon={<FaArrowRotateRight />}
      />
      <Transform
        handleRotate={handleRotate}
        activeTransform="horizontal"
        activeTransformIcon={<LuFlipHorizontal2 />}
      />
      <Transform
        handleRotate={handleRotate}
        activeTransform="vertical"
        activeTransformIcon={<LuFlipVertical2 />}
      />
    </div>
  );
};

export default MobileTransforms;
