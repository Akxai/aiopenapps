import React from "react";
import { useState, useEffect } from "react";
import "../theme/Dark.css";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import DarkMode from "../../src/theme/DarkMode/DarkMode";
import "../theme/DarkMode/DarkMode.css";
import { ReactComponent as Sun } from "../theme/DarkMode/Sun.svg";
import { ReactComponent as Moon } from "../theme/DarkMode/Moon.svg";
import { FaSun } from "react-icons/fa";
// import { useSelector , useDispatch } from 'react-redux'

function Dark() {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [hoverColor, setHoverColor] = useState("#ffffff");
  const [lghtColor, setlghtColor] = useState("#343541");

  const handleColorChange = (
    bgColor,
    lghtColor,
    textColor,
    iconColor,
    hoverColor,
    whiteColor,
    shadowColor,
    floatnavColor,
    btntextColor,
    purpleColor,
    bdyColor,
    purplebgColor,
    radColor,
    categoryColor,
    cardColor
  ) => {
    setBackgroundColor(bgColor);
    setlghtColor(lghtColor);
    setTextColor(textColor);
    setHoverColor(hoverColor);
    document.documentElement.style.setProperty("--bg-color", bgColor);
    document.documentElement.style.setProperty("--color-light", lghtColor);
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--icon-color", iconColor);
    document.documentElement.style.setProperty("--hover-color", hoverColor);
    document.documentElement.style.setProperty("--white-color", whiteColor);
    document.documentElement.style.setProperty("--shadow-color", shadowColor);
    document.documentElement.style.setProperty("--nav-color", floatnavColor);
    document.documentElement.style.setProperty("--bttxt-color", btntextColor);
    document.documentElement.style.setProperty("--purple-color", purpleColor);
    document.documentElement.style.setProperty("--spl-bg", bdyColor);
    document.documentElement.style.setProperty("--purple-bg", purplebgColor);
    document.documentElement.style.setProperty("--radtxt-clr", radColor);
    document.documentElement.style.setProperty(
      "--category-color",
      categoryColor
    );
    document.documentElement.style.setProperty("--card-color", cardColor);
  };

  const [dark, setDark] = useState(false);

  const handleDark = () => {
    if (!dark) {
      setDark(true);
      handleColorChangeAndDark();
    } else {
      setDark(false);
      handleWhite();
    }
  };

  const handleColorChangeAndDark = () => {
    handleColorChange(
      "#121212",
      "#292929",
      " #ffffff",
      "#d6d4d4d4",
      "",
      "",
      "#ffffff",
      "#292929",
      "#000000",
      "#92140C",
      "#000000",
      "",
      "#00FFF2",
      "#ffffff",
      "#292929"
    );
  };

  const handleWhite = () => {
    handleColorChange(
      "#FFF8F0",
      "#ffffff",
      "#000000",
      "#272727c1",
      "#000000",
      "#0000001a",
      "#000000",
      "#111d4a",
      "#ffffff",
      "#000000",
      "",
      "#4e42b2",
      "#000000",
      "#1E1E24",
      "#1E1E24"
    );
  };

  // const { auth , theme } = useSelector( state => state);
  // const dispatch = useDispatch();

  const handleOne = () => {
    handleColorChangeAndDark();
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggle = () => {
    if (isDarkMode) {
      handleWhite();
      setIsDarkMode(false);
    } else {
      handleColorChangeAndDark();
      setIsDarkMode(true);
    }
  };
  return (
    <div className="container background">
      <div className="flex justify-center items-center ">
        {
          isDarkMode ?
            <FaSun onClick={handleToggle} style={{ fontSize: '1.7rem', color: 'orange', marginRight: '2rem', cursor: 'pointer' }} />
            :
            <FaMoon onClick={handleToggle} style={{ fontSize: '1.7rem', color: 'white', marginRight: '2rem', cursor: 'pointer' }} />
        }


      </div>
    </div>
  );
}

export default Dark;
