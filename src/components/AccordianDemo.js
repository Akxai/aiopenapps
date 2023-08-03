import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function AccordionDemo() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAccordionClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleOptionSelectInternal = (option) => {
    setSelectedOption(option);
    handleOptionSelect(option); // Call the prop function to update the selected option in the parent component
    setShowOptions(false);
  };

  return (
    <div className="w-full bg-white font-mont font-semibold rounded-lg">
      <div className="rounded-lg">
        <div
          className={`py-4 px-4 cursor-pointer rounded-lg flex justify-between items-center ${
            showOptions ? "bg-gray-200" : ""
          }`}
          onClick={handleAccordionClick}
        >
          {selectedOption ? selectedOption : "Select"}
          <IoIosArrowDown className="font-semibold" />
        </div>
        {showOptions && (
          <div>
            <div
              className="p-4 cursor-pointer text-center"
              onClick={() => handleOptionSelectInternal("Free")}
            >
              Free
            </div>
            <div
              className="p-4 cursor-pointer text-center"
              onClick={() => handleOptionSelectInternal("Freemium")}
            >
              Freemium
            </div>
            <div
              className="p-4 cursor-pointer text-center"
              onClick={() => handleOptionSelect("Free Trail")}
            >
              Free Trail
            </div>
            <div
              className="p-4 cursor-pointer text-center"
              onClick={() => handleOptionSelect("Paid")}
            >
              Paid
            </div>
            <div
              className="p-4 cursor-pointer text-center"
              onClick={() => handleOptionSelect("Contact for Pricing")}
            >
              Contact for Pricing
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
