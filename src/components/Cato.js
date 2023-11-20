import React from "react";
import "../App.css";

export default function Cato({ name, handleClick, isActive }) {
  const handleClickCategory = () => {
    handleClick(name);
  };
  return (
    <button
      onClick={handleClickCategory}
      className={`btnu ${
        isActive ? "activebt" : ""
      } xl:text-white lg:text-white md:text-white text-black `}
    >
      {name}
    </button>
  );
}
