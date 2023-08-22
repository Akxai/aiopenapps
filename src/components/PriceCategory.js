import React from "react";

export default function PriceCategory({ name, handleClick }) {
  const handleClickCategory = () => {
    handleClick(name);
  };
  return (
    <button
      onClick={handleClickCategory}
      className="focus:text-[#00FFF2] hover:text-[#00FFF2] font-mont text-black lg:text-white xl:text-white text-[16px] font-semibold"
    >
      {name}
    </button>
  );
}
