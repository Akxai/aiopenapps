import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FiSearch } from "react-icons/fi";
import PriceCategory from "../components/PriceCategory";
import Category from "../components/Category";
import Card from "../components/Card";
import TopScroll from "../components/TopScroll";
import { useInView } from 'react-intersection-observer';
import '../components/Footer.css'
import '../App.css'




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

  const [ scrollTop , setScrollTop ] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.01, // Trigger animation when the component is at least 50% visible
    triggerOnce: false // Trigger animation every time the component comes into view
  });

  useEffect(() => {
    if (inView) {
      setScrollTop(true)
    } else {
       setScrollTop(false)
    }
  }, [inView,setScrollTop]);
 
  const categories = [
    "All", "Arts", "Avatars", "Audio Editing", "Code Dev", "Copywriter",
    "Dev Tools", "Design Tools", "Education", "Finance", "Fun Apps", "Gaming",
    "Generative AI", "Health", "HR Assist", "Image Editing", "Logo Generator",
    "Low/No Code", "Marketing", "Music", "Productivity", "Prompt AI", "Research",
    "Resources", "SEO", "Speech to Text", "Text to Speech", "Text to Video",
    "Translation", "Video Editing", "Voice Changer"
  ];
  

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
          isActive={selectedPriceCategory === 'All'}

        />
        <PriceCategory
          name="Free"
          handleClick={() => handlePriceCategoryClick("Free")}
          isActive={selectedPriceCategory === 'Free'}
        />
        <PriceCategory
          name="Free Trail"
          handleClick={() => handlePriceCategoryClick("Free Trail")}
          isActive={selectedPriceCategory === 'Free Trail'}
        />
        <PriceCategory
          name="Freemium"
          handleClick={() => handlePriceCategoryClick("Freemium")}
          isActive={selectedPriceCategory === 'Freemium'}
        />
        <PriceCategory
          name="Paid"
          handleClick={() => handlePriceCategoryClick("Paid")}
          isActive={selectedPriceCategory === 'Paid'}
        />
        <PriceCategory
          name="Contact For Pricing"
          handleClick={() => handlePriceCategoryClick("Contact For Pricing")}
          isActive={selectedPriceCategory === 'Contact For Pricing'}
        />
      </div>
      <div className="flex flex-wrap justify-center px-4 md:px-[15%] gap-2 md:gap-4 mt-8">
        <Category name="All"
         handleClick={handleCategoryClick} 
        isActive={selectedCategory === 'All'} 
        />
        <Category name="Arts" handleClick={handleCategoryClick} isActive={selectedCategory === 'Arts'}/>
        <Category name="Avatars" handleClick={handleCategoryClick} isActive={selectedCategory === 'Avatars'}/>
        <Category name="Audio Editing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Audio Editing'}/>
        <Category name="Code Dev" handleClick={handleCategoryClick} isActive={selectedCategory === 'Code Dev'}/>
        <Category name="Copywriter" handleClick={handleCategoryClick} isActive={selectedCategory === 'Copywriter'}/>
        <Category name="Dev Tools" handleClick={handleCategoryClick} isActive={selectedCategory === 'Dev Tools'}/>
        <Category name="Design Tools" handleClick={handleCategoryClick} isActive={selectedCategory === 'Design Tools'}/>
        <Category name="Education" handleClick={handleCategoryClick} isActive={selectedCategory === 'Education'}/>
        <Category name="Finance" handleClick={handleCategoryClick} isActive={selectedCategory === 'Finance'}/>
        <Category name="Fun Apps" handleClick={handleCategoryClick} isActive={selectedCategory === 'Fun Apps'}/>
        <Category name="Gaming" handleClick={handleCategoryClick} isActive={selectedCategory === 'Gaming'}/>
        <Category name="Generative AI" handleClick={handleCategoryClick} isActive={selectedCategory === 'Generative AI'}/>
        <Category name="Health" handleClick={handleCategoryClick} isActive={selectedCategory === 'Health'}/>
        <Category name="HR Assist" handleClick={handleCategoryClick} isActive={selectedCategory === 'HR Assist'}/>
        <Category name="Image Editing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Image Editing'}/>
        <Category name="Logo Generator" handleClick={handleCategoryClick} isActive={selectedCategory === 'Logo Generator'}/>
        <Category name="Low/No Code" handleClick={handleCategoryClick} isActive={selectedCategory === 'Low/No Code'}/>
        <Category name="Marketing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Marketing'}/>
        <Category name="Music" handleClick={handleCategoryClick} isActive={selectedCategory === 'Music'}/>
        <Category name="Productivity" handleClick={handleCategoryClick} isActive={selectedCategory === 'Productivity'}/>
        <Category name="Prompt AI" handleClick={handleCategoryClick} isActive={selectedCategory === 'Prompt AI'}/>
        <Category name="Research" handleClick={handleCategoryClick} isActive={selectedCategory === 'Research'}/>
        <Category name="Resources" handleClick={handleCategoryClick} isActive={selectedCategory === 'Resources'}/>
        <Category name="SEO" handleClick={handleCategoryClick} isActive={selectedCategory === 'SEO'}/>
        <Category name="Speech to Text" handleClick={handleCategoryClick} isActive={selectedCategory === 'Speech to Text'}/>
        <Category name="Text to Speech" handleClick={handleCategoryClick} isActive={selectedCategory === 'Text to Speech'}/>
        <Category name="Text to Video" handleClick={handleCategoryClick} isActive={selectedCategory === 'Text to Video'}/>
        <Category name="Translation" handleClick={handleCategoryClick} isActive={selectedCategory === 'Translation'}/>
        <Category name="Video Editing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Video Editing'}/>
        <Category name="Voice Changer" handleClick={handleCategoryClick} isActive={selectedCategory === 'Voice Changer'}/>
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
      <div ref={ref}>
        
      </div>
      <div className={`high ${ scrollTop ? "acthigh" : "dchigh"}`}>
         <TopScroll/>
      </div>
       
       
    </div>
  );
}
