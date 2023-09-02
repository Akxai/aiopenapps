import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

export default function Carousel() {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
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
        }`
      )
      .then((data) => {
        const shuffledData = shuffleArray(data);
        const slicedData = shuffledData.slice(0, 3);
        setPost(slicedData);
      })
      .catch(console.error);
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <main>
      <a className="cursor-pointer">
        <div className="w-full flex justify-evenly mb-8 mt-[140px] flex-wrap gap-x-4 gap-y-8 lg:px-32">
          {postData &&
            postData.map((post, index) => (
              <CarouselItem key={index} post={post} />
            ))}
        </div>
      </a>
    </main>
  );
}

function CarouselItem({ post }) {
  return (
    <a href={"/product/" + post.slug.current} key={post.slug.current}>
      <div>
        {post.mainImage && (
          <img
            className="rounded-t-3xl object-cover card-image border-t-2 border-r-2 border-l-2 border-black"
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt}
            width={360}
            height={240}
          />
        )}
        <div className="py-4 px-4 border-b-2 border-r-2 border-l-2 border-black rounded-b-3xl bg-white">
          <div className="flex justify-between items-center">
            <h1 className="font-bold font-mont text-[20px]">{post.title}</h1>
            {post.price && (
              <div className="font-mont font-semibold text-white text-[8px] bg-black rounded-md px-3 py-1.5 flex justify-center items-center">
                {post.price}
              </div>
            )}
          </div>
          <div className="mt-2">
            <p className="font-mont font-semibold text-[10px] leading-3 max-w-[320px]">
              {post.body && post.body[0]?.children && (
                <p className="font-mont font-semibold text-[10px] leading-3 flex flex-wrap max-w-[320px]">
                  {post.body[0].children[0]?.text.slice(0, 100) +
                    (post.body[0].children[0].text.length > 100 ? "..." : "")}
                </p>
              )}
            </p>
          </div>

          <div className="mt-3 flex justify-start gap-x-2 items-center">
            {post.subCategories &&
              post.subCategories.map((subcategory, index) => (
                <p
                  key={index}
                  className="bg-[#909090] text-white font-medium font-mont text-[8px] px-2 py-1 rounded-md"
                >
                  {subcategory}
                </p>
              ))}
          </div>

          <div className="flex justify-start items-center mt-3">
            <button className="font-mont text-white bg-black text-[8px] font-semibold px-3 py-1.5 rounded-md">
              Visit Page
            </button>
          </div>
        </div>
      </div>
    </a>
  );
}
