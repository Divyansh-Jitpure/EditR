import React, { useState } from "react";
import MobileFilters from "./MobileFilters";
import MobileTransforms from "./MobileTransforms";

const btnStyles =
  "mx-1 w-32 rounded-lg border-2 border-black  py-4 text-xl font-medium capitalize text-[#EEEEEE]";

const activeStyles =
  "mx-1 w-32 rounded-lg border-2 border-black text-[#EEEEEE] bg-[#222831] py-4 text-xl font-medium capitalize";

const MobileTools = ({
  activeFilter,
  setActiveFilter,
  setSliderValue,
  sliderValues,
  handleRotate,
}) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const TabContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div className="mb-2 w-screen text-center">
            <MobileFilters
              sliderValues={sliderValues}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setSliderValue={setSliderValue}
            />
          </div>
        );
      default:
        return (
          <div className="mb-[27px] w-full text-center">
            <MobileTransforms handleRotate={handleRotate} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center md:hidden">
      <div className="tab-content">
        <TabContent />
      </div>
      <div className="tabs flex w-72 justify-center">
        <button
          onClick={() => setActiveTab("tab1")}
          className={activeTab === "tab1" ? activeStyles : btnStyles}
        >
          <span>Filters</span>
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={activeTab === "tab2" ? activeStyles : btnStyles}
        >
          <span>Transform</span>
        </button>
      </div>
    </div>
  );
};

export default MobileTools;
