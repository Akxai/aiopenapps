import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FiSearch } from "react-icons/fi";
import PriceCategory from "../components/PriceCategory";
import Category from "../components/Category";
import Card from "../components/Card";

export default function Home() {
  const [text] = useTypewriter({
    words: ["TOOLS", "APPS"],
    loop: true,
    deleteSpeed: 100,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceCategory, setSelectedPriceCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handlePriceCategoryClick = (priceCategory) => {
    setSelectedPriceCategory(priceCategory);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex mt-[150px] justify-center font-semibold text-2xl md:text-4xl text-white font-mont gap-x-3">
        <div>TOP AI WEB</div>
        <div className="text-[#00FFF2] z-[-10]">
          <span>{text}</span>
          <Cursor />
          <svg
            className="hidden md:w-[121px] sm:w-[80px] md:block sm:block"
            width="121"
            height="11"
            viewBox="0 0 151 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.63573 7.9904C31.5877 3.03939 103.008 -3.60825 149.074 9.4093"
              stroke="#00FFF2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="hidden  md:w-[123px] sm:w-[82px] md:block sm:block"
            width="123"
            height="9"
            viewBox="0 0 143 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.62197 5.76896C34.3196 2.04843 107.993 -2.78234 141.108 7.65876"
              stroke="#00FFF2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 z-[-10]">
        <h3 className="text-white font-semibold lg:text-lg md:text-[13px] sm:text-[11px] font-grenze leading-8 uppercase tracking-wide">
          Best directory of AI: tools, news & blogs
        </h3>
      </div>

      <div className="flex justify-center items-center mt-8 px-[10%] md:px-[25%] sm:px-[15%] relative">
        <input
          id="main-search"
          type="text"
          placeholder="Search AI"
          className="w-full rounded-md px-4 py-2 placeholder:font-mont placeholder:text-black placeholder:opacity-80 outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FiSearch className="absolute right-[13%] md:right-[26%] sm:right-[16%] text-gray-600 cursor-pointer" />
      </div>

      {/* Price categories */}
      <div className="flex justify-center mt-8 gap-x-4 gap-y-4 flex-wrap px-[10%]">
        <PriceCategory
          name="All"
          handleClick={() => handlePriceCategoryClick("All")}
        />
        <PriceCategory
          name="Free"
          handleClick={() => handlePriceCategoryClick("Free")}
        />
        <PriceCategory
          name="Free Trail"
          handleClick={() => handlePriceCategoryClick("Free Trail")}
        />
        <PriceCategory
          name="Freemium"
          handleClick={() => handlePriceCategoryClick("Freemium")}
        />
        <PriceCategory
          name="Paid"
          handleClick={() => handlePriceCategoryClick("Paid")}
        />
        <PriceCategory
          name="Contact For Pricing"
          handleClick={() => handlePriceCategoryClick("Contact For Pricing")}
        />
      </div>
      <div className="flex flex-wrap justify-center px-4 md:px-[15%] gap-2 md:gap-4 mt-8">
        <Category name="All" handleClick={handleCategoryClick} />
        <Category name="Arts" handleClick={handleCategoryClick} />
        <Category name="Avatars" handleClick={handleCategoryClick} />
        <Category name="Audio Editing" handleClick={handleCategoryClick} />
        <Category name="Code Dev" handleClick={handleCategoryClick} />
        <Category name="Copywriter" handleClick={handleCategoryClick} />
        <Category name="Dev Tools" handleClick={handleCategoryClick} />
        <Category name="Design Tools" handleClick={handleCategoryClick} />
        <Category name="Education" handleClick={handleCategoryClick} />
        <Category name="Finance" handleClick={handleCategoryClick} />
        <Category name="Fun Apps" handleClick={handleCategoryClick} />
        <Category name="Gaming" handleClick={handleCategoryClick} />
        <Category name="Generative AI" handleClick={handleCategoryClick} />
        <Category name="Health" handleClick={handleCategoryClick} />
        <Category name="HR Assist" handleClick={handleCategoryClick} />
        <Category name="Image Editing" handleClick={handleCategoryClick} />
        <Category name="Logo Generator" handleClick={handleCategoryClick} />
        <Category name="Low/No Code" handleClick={handleCategoryClick} />
        <Category name="Marketing" handleClick={handleCategoryClick} />
        <Category name="Music" handleClick={handleCategoryClick} />
        <Category name="Productivity" handleClick={handleCategoryClick} />
        <Category name="Prompt AI" handleClick={handleCategoryClick} />
        <Category name="Research" handleClick={handleCategoryClick} />
        <Category name="Resources" handleClick={handleCategoryClick} />
        <Category name="SEO" handleClick={handleCategoryClick} />
        <Category name="Speech to Text" handleClick={handleCategoryClick} />
        <Category name="Text to Speech" handleClick={handleCategoryClick} />
        <Category name="Text to Video" handleClick={handleCategoryClick} />
        <Category name="Translation" handleClick={handleCategoryClick} />
        <Category name="Video Editing" handleClick={handleCategoryClick} />
        <Category name="Voice Changer" handleClick={handleCategoryClick} />
        {/* Add rest of the categories here */}
      </div>
      {/* Cards */}
      <div className="max-w-full flex justify-evenly mb-8 mt-8 flex-wrap px-4">
        <Card
          category={selectedCategory}
          priceCategory={selectedPriceCategory}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
