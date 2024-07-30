import React, { useState, useRef, useEffect } from "react";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div className="flex w-[90%] flex-col">
      <div
        onClick={toggleAccordion}
        className="mb-3 mt-1 cursor-pointer list-none border-y-2 border-black py-2 text-3xl font-medium"
      >
        Accordion
      </div>
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <p className="p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio neque
          dolor magnam quo atque inventore? Libero dolorem sunt quasi iste
          obcaecati recusandae quis provident itaque, reprehenderit quaerat?
          Incidunt, commodi culpa?
        </p>
      </div>
    </div>
  );
};

export default Accordion;
