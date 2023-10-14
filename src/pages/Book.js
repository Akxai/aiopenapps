import React from 'react'
import Bookmark from './Bookmark'
import PriceCategory from "../components/PriceCategory";
import Category from "../components/Category";
import { useState } from 'react';
import '../App.css'

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
  return (
    <div className = 'book'>
        <h1 className="text-[30px] mt-32 md:text-[44px] lg:text-[44px] sm:text-[30px] text-white font-semibold text-center font-mont leading-snug">
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
      <div className="flex flex-wrap justify-center px-4 md:px-[15%] gap-2 md:gap-4 mt-8 mb-10">
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
