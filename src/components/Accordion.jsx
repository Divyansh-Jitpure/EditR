import React, { useState, useEffect } from "react";

const Accordion = ({ title, targetRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = targetRef;

  // Toggle Accordion
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Accordion Effect
  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    // Accordion Function
    <div className="flex w-full cursor-pointer select-none flex-col">
      <div
        onClick={toggleAccordion}
        className="mb-3 mt-1 flex items-center justify-between border-y-2 border-black py-2 text-center text-3xl font-medium"
      >
        <span>{title}</span>
        {/* + - SVG with Animation*/}
        <svg
          className="shrink-0 fill-black"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center transform transition duration-200 ease-out ${
              isOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transform transition duration-200 ease-out ${
              isOpen && "!rotate-180"
            }`}
          />
        </svg>
      </div>
    </div>
  );
};

export default Accordion;
