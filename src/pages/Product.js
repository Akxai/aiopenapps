import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import { BiLinkExternal } from "react-icons/bi";

export default function Product() {
  const location = useLocation();
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]{
          title,
          tags,
          description,
          price,
          url,
          imageDescription{
            asset->{
              url
            },
            alt
          },  
          mainImage{
            asset->{
              url
            },
            alt
          },
          subCategories[],
          newCategory{ // Add this line to fetch the newCategory field
            image{
              asset->{
                url
              },
              alt
            },
            video{
              asset->{
                url
              }
            }
          }
        }`,
        { slug }
      )
      .then((data) => setProductData(data[0]))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    const body = document.body;
    if (location.pathname.startsWith("/product")) {
      body.classList.add("product-page");
    } else {
      body.classList.remove("product-page");
    }
  }, [location.pathname]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="px-6 md:px-[20%] md:mt-[150px] mt-[100px]">
        {productData.newCategory && productData.newCategory.video ? (
          <video
            className="w-full h-auto max-h-[458px] mb-8 md:mb-16 rounded-2xl shadow-lg object-cover product-info"
            controls
            autoPlay
            loop
          >
            <source
              src={productData.newCategory.video.asset.url}
              type="video/mp4"
            />
            {console.log(productData.newCategory.video.asset.url)}
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            className="w-full h-auto max-h-[458px] mb-8 md:mb-16 rounded-2xl shadow-lg object-cover product-info"
            src={productData.mainImage.asset.url}
            alt={productData.mainImage.alt}
          />
        )}
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center px-4 md:px-40">
        <div className="flex flex-col space-y-2">
          <div>
            <h1 className="font-mont text-xl md:text-3xl font-semibold">
              {productData.title}
            </h1>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <div>
              <p className="font-mont text-base md:text-xl font-semibold">
                Tags: {productData.tags}
              </p>
            </div>
            <div className="flex justify-start gap-x-2 items-center">
              {productData.subCategories &&
                productData.subCategories.map((subcategory, index) => (
                  <p
                    key={index}
                    className="bg-[#909090] text-white font-medium font-mont text-[8px] px-2 py-1 rounded-md"
                  >
                    {subcategory}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-2">
          <button
            href=""
            className="bg-[#6D5DF3] px-3 py-1 text-white font-mont text-sm md:text-base font-semibold rounded-md"
          >
            {productData.price}
          </button>
          <Link
            to={productData.url}
            target="_blank"
            className="bg-[#6D5DF3] px-5 py-1 text-white font-mont text-sm md:text-base font-semibold rounded-md"
          >
            <BiLinkExternal className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-6 md:mt-8 px-4 md:px-10 lg:px-20 xl:px-40 mb-14">
        <p className="font-mont font-semibold text-lg md:text-xl leading-[24px] md:leading-[29px] text-justify">
          {productData.description.length > 1000
            ? productData.description.slice(0, 1000) + "..."
            : productData.description}
        </p>
        {productData.imageDescription && productData.imageDescription.asset ? (
          <img
            className="w-full md:w-[460px] h-[337px] mb-8 md:mb-16 rounded-2xl shadow-lg object-cover product-info"
            src={productData.imageDescription.asset.url}
            alt={productData.imageDescription.alt}
          />
        ) : (
          <img
            className="w-full md:w-[460px] h-[337px]  mb-8 md:mb-16 rounded-2xl shadow-lg object-cover product-info"
            src={productData.mainImage.asset.url}
            alt={productData.mainImage.alt}
          />
        )}
      </div>

      <Carousel />
    </div>
  );
}
