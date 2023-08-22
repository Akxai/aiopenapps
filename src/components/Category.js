import React from "react";

export default function Category({ name, handleClick }) {
  const handleClickCategory = () => {
    handleClick(name);
  };
  return (
    <button
      onClick={handleClickCategory}
      className="text-black lg:text-white xl:text-white font-semibold font-mont text-[16px] underline underline-offset-4 focus:text-[#00FFF2] hover:text-[#00FFF2]"
    >
      {name}
    </button>
  );
}
