import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import "../App.css";
import { Link } from "react-router-dom";

// ... (existing imports)

// ... (existing imports)

export default function Card({ category, priceCategory, searchTerm }) {
  const [postData, setPost] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 21;

  useEffect(() => {
    let query = `*[_type == "post"]{
      title,
      slug,
      body,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      categories[]->{
        title
      },
      subCategories[],
      price
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        setPost(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (postData && postData.length > 0) {
      // Set tempData to the original postData
      let tempData = [...postData];

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        tempData = tempData.filter((post) => {
          const titleMatch = post.title.toLowerCase().includes(searchTermLower);
          const priceCategoryMatch =
            post.price && post.price.toLowerCase().includes(searchTermLower);
          const subCategoryMatch =
            post.subCategories &&
            post.subCategories.some((subcategory) =>
              subcategory.toLowerCase().includes(searchTermLower)
            );

          return titleMatch || priceCategoryMatch || subCategoryMatch;
        });
      }

      if (category !== "All") {
        const categoryLower = category.toLowerCase();
        tempData = tempData.filter((post) =>
          post.subCategories?.some(
            (subcategory) => subcategory.toLowerCase() === categoryLower
          )
        );
      }

      if (priceCategory !== "All") {
        tempData = tempData.filter((post) => post.price === priceCategory);
      }

      // Set filteredData to tempData
      setFilteredData(tempData);
    }
  }, [postData, category, priceCategory, searchTerm]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData?.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className="w-full flex justify-evenly mb-8 mt-14 flex-wrap gap-x-4 gap-y-8 lg:px-32">
        {currentCards &&
          currentCards.map((post, index) => (
            <CardItem key={index} post={post} />
          ))}
      </div>

      <div className="flex justify-center mt-4">
        {filteredData && (
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={filteredData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </main>
  );
}

// ... (remaining code)

// ... (remaining code)

function CardItem({ post }) {
  return (
    <Link to={"/product/" + post.slug.current} key={post.slug.current}>
      <div className="w-full car card-container">
        <div className="card-content hover:shadow-2xl hover:-translate-y-2 transition-all">
          {post.mainImage && (
            <img
              className="rounded-t-3xl object-cover card-image border-t-2 border-r-2 border-l-2 border-black"
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt}
              width={360}
              height={240}
            />
          )}
          <div className="crds">
            <div className="py-4 px-4 rounded-b-3xl  border-b-2 border-r-2 border-l-2 border-black max-w-[360px]">
              {post.title && (
                <div className="flex justify-between items-center">
                  <h1 className="font-bold font-mont text-[20px]">
                    {post.title}
                  </h1>
                  {post.price && (
                    <div className="pbtn">
                      <div className="font-mont font-semibold text-[9px]  rounded-md px-3 py-1.5 flex justify-center items-center bb">
                        {post.price}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-2 flex flex-wrap">
                {post.body && post.body[0]?.children && (
                  <p className="font-mont font-semibold text-[10px] leading-3 flex flex-wrap max-w-[320px]">
                    {post.body[0].children[0]?.text.slice(0, 100) +
                      (post.body[0].children[0].text.length > 100 ? "..." : "")}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap justify-between items-end">
                <div className="mt-6 flex justify-between gap-x-2 items-center flex-wrap gap-y-2">
                  {post.subCategories &&
                    post.subCategories.slice(0, 2).map((subcategory, index) => (
                      <div className="pbttn" key={index}>
                        <p className="font-medium font-mont text-[9px] px-3 py-1.5 rounded-md">
                          {subcategory}
                        </p>
                      </div>
                    ))}
                </div>

                <button className="font-mont  text-[9px] font-semibold px-3 py-1.5 rounded-md mt-2">
                  Visit Page
                </button>
              </div>
              {/* <div className="flex justify-start items-center mt-3">
              <button className="font-mont text-white bg-black text-[8px] font-semibold px-3 py-1.5 rounded-md">
                Visit Page
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const Pagination = ({ cardsPerPage, totalCards, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pagi ${currentPage === number ? "active" : ""}`}
          >
            <button className="b" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
