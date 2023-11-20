import React from 'react'
import Bookmark from './Bookmark'
import PriceCategory from "../components/PriceCategory";
import Cato from "../components/Cato";
import { useState } from 'react';
import '../App.css'
import { useRef } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'

const Book = () => {
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

  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100; // Scroll 1rem (16px) to the left
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 100; // Scroll 1rem (16px) to the right
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      handleScrollLeft();
    } else if (event.key === 'ArrowRight') {
      handleScrollRight();
    }
  };

  return (
    <div className = 'book'>
        <h1 className="text-[30px] mt-32 md:text-[44px] lg:text-[44px] sm:text-[30px] txtclr font-semibold text-center font-mont leading-snug">
            Bookmarks
          </h1>
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
      <div className ='slide' onKeyDown={handleKeyDown} tabIndex={0}> 
      <AiOutlineLeft className='lft' onClick={handleScrollLeft}/>
      <div className="slidebar" ref={scrollRef}>
         
        <Cato name="All"
         handleClick={handleCategoryClick} 
        isActive={selectedCategory === 'All'} 
        />
        <Cato name="Arts" className = 'cto' handleClick={handleCategoryClick} isActive={selectedCategory === 'Arts'}/>
        <Cato name="Avatars" handleClick={handleCategoryClick} isActive={selectedCategory === 'Avatars'}/>
        <Cato name="Audio Editing"  handleClick={handleCategoryClick} isActive={selectedCategory === 'Audio Editing'}/>
        <Cato name="Code Dev" handleClick={handleCategoryClick} isActive={selectedCategory === 'Code Dev'}/>
        <Cato name="Copywriter" handleClick={handleCategoryClick} isActive={selectedCategory === 'Copywriter'}/>
        <Cato name="Dev Tools" handleClick={handleCategoryClick} isActive={selectedCategory === 'Dev Tools'}/>
        <Cato name="Design Tools" handleClick={handleCategoryClick} isActive={selectedCategory === 'Design Tools'}/>
        <Cato name="Education" handleClick={handleCategoryClick} isActive={selectedCategory === 'Education'}/>
        <Cato name="Finance" handleClick={handleCategoryClick} isActive={selectedCategory === 'Finance'}/>
        <Cato name="Fun Apps" handleClick={handleCategoryClick} isActive={selectedCategory === 'Fun Apps'}/>
        <Cato name="Gaming" handleClick={handleCategoryClick} isActive={selectedCategory === 'Gaming'}/>
        <Cato name="Generative AI" handleClick={handleCategoryClick} isActive={selectedCategory === 'Generative AI'}/>
        <Cato name="Health" handleClick={handleCategoryClick} isActive={selectedCategory === 'Health'}/>
        <Cato name="HR Assist" handleClick={handleCategoryClick} isActive={selectedCategory === 'HR Assist'}/>
        <Cato name="Image Editing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Image Editing'}/>
        <Cato name="Logo Generator" handleClick={handleCategoryClick} isActive={selectedCategory === 'Logo Generator'}/>
        <Cato name="Low/No Code" handleClick={handleCategoryClick} isActive={selectedCategory === 'Low/No Code'}/>
        <Cato name="Marketing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Marketing'}/>
        <Cato name="Music" handleClick={handleCategoryClick} isActive={selectedCategory === 'Music'}/>
        <Cato name="Productivity" handleClick={handleCategoryClick} isActive={selectedCategory === 'Productivity'}/>
        <Cato name="Prompt AI" handleClick={handleCategoryClick} isActive={selectedCategory === 'Prompt AI'}/>
        <Cato name="Research" handleClick={handleCategoryClick} isActive={selectedCategory === 'Research'}/>
        <Cato name="Resources" handleClick={handleCategoryClick} isActive={selectedCategory === 'Resources'}/>
        <Cato name="SEO" handleClick={handleCategoryClick} isActive={selectedCategory === 'SEO'}/>
        <Cato name="Speech to Text" handleClick={handleCategoryClick} isActive={selectedCategory === 'Speech to Text'}/>
        <Cato name="Text to Speech" handleClick={handleCategoryClick} isActive={selectedCategory === 'Text to Speech'}/>
        <Cato name="Text to Video" handleClick={handleCategoryClick} isActive={selectedCategory === 'Text to Video'}/>
        <Cato name="Translation" handleClick={handleCategoryClick} isActive={selectedCategory === 'Translation'}/>
        <Cato name="Video Editing" handleClick={handleCategoryClick} isActive={selectedCategory === 'Video Editing'}/>
        <Cato name="Voice Changer" handleClick={handleCategoryClick} isActive={selectedCategory === 'Voice Changer'}/>
        {/* Add rest of the categories here */}
         
      </div>
      <AiOutlineRight className='rgt' onClick={handleScrollRight}/>
      </div>
       
      <div className="max-w-full flex justify-evenly mb-8 mt-8 flex-wrap px-4">
        <Bookmark
          category={selectedCategory}
          priceCategory={selectedPriceCategory}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  )
}

export default Book
