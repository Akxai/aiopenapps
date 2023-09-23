import React from "react";
import '../App.css'

export default function PriceCategory({ name, handleClick ,isActive}) {
  const handleClickCategory = () => {
    handleClick(name);
  };
  return (
    <button
      onClick={handleClickCategory}
      className={`btnbig ${ isActive ? "active" : ""}`}
    >
      {name}
    </button>
  );
}
