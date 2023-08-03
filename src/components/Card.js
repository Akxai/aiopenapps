import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

export default function Card({ category, priceCategory, searchTerm }) {
  const [postData, setPost] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

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
      let filteredData = postData;

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filteredData = postData.filter((post) => {
          const titleMatch = post.title.toLowerCase().includes(searchTermLower);
          // const categoryMatch =
          //   post.categories &&
          //   post.categories.some((category) =>
          //     category.title.toLowerCase().includes(searchTermLower)
          //   );
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
        filteredData = filteredData.filter((post) =>
          post.subCategories?.some(
            (subcategory) => subcategory.toLowerCase() === categoryLower
          )
        );
      }

      if (priceCategory !== "All") {
        filteredData = filteredData.filter(
          (post) => post.price === priceCategory
        );
      }

      setFilteredData(filteredData);
    }
  }, [postData, category, priceCategory, searchTerm]);

  return (
    <main>
      <a className="cursor-pointer">
        <div className="w-full flex justify-evenly mb-8 mt-14 flex-wrap gap-x-4 gap-y-8 lg:px-32">
          {filteredData &&
            filteredData.map((post, index) => (
              <CardItem key={index} post={post} />
            ))}
        </div>
      </a>
    </main>
  );
}

// function CardItem({ post }) {
//   return (
//     <a href={"/product/" + post.slug.current} key={post.slug.current}>
//       <div className="w-full card">
//         <img
//           className="rounded-t-3xl object-cover card-image"
//           src={post.mainImage.asset.url}
//           alt={post.mainImage.alt}
//           width={360}
//           height={240}
//         />
//         <div className="py-4 px-4 border border-black rounded-b-3xl bg-white">
//           <div className="flex justify-between items-center">
//             <h1 className="font-bold font-mont text-[20px]">{post.title}</h1>
//             {post.price && (
//               <div className="font-mont font-semibold text-white text-[8px] bg-black rounded-md px-3 py-1.5 flex justify-center items-center">
//                 {post.price}
//               </div>
//             )}
//           </div>
//           <div className="mt-2 flex flex-wrap">
//             <p className="font-mont font-semibold text-[10px] leading-3 flex flex-wrap max-w-[320px]">
//               {/* {post.body[0].children[0].text} */}
//               {/* {post.body &&
//                 post.body[0]?.children &&
//                 post.body[0].children[0]?.text} */}
//               {post.body &&
//                 post.body[0]?.children &&
//                 post.body[0].children[0]?.text.slice(0, 100) +
//                   (post.body[0].children[0].text.length > 100 ? "..." : "")}
//             </p>
//           </div>

//           <div className="mt-3 flex justify-start gap-x-2 items-center">
//             {post.subCategories &&
//               post.subCategories.map((subcategory, index) => (
//                 <p
//                   key={index}
//                   className="bg-[#909090] text-white font-medium font-mont text-[8px] px-2 py-1 rounded-md"
//                 >
//                   {subcategory}
//                 </p>
//               ))}
//           </div>

//           <div className="flex justify-start items-center mt-3">
//             <button className="font-mont text-white bg-black text-[8px] font-semibold px-3 py-1.5 rounded-md">
//               Visit Page
//             </button>
//           </div>
//         </div>
//       </div>
//     </a>
//   );
// }

function CardItem({ post }) {
  return (
    <a href={"/product/" + post.slug.current} key={post.slug.current}>
      <div className="w-full card card-container">
        <div className="card-content">
          {post.mainImage && (
            <img
              className="rounded-t-3xl object-cover card-image"
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt}
              width={360}
              height={240}
            />
          )}
          <div className="py-4 px-4 border border-black rounded-b-3xl bg-white">
            {post.title && (
              <div className="flex justify-between items-center">
                <h1 className="font-bold font-mont text-[20px]">
                  {post.title}
                </h1>
                {post.price && (
                  <div className="font-mont font-semibold text-white text-[8px] bg-black rounded-md px-3 py-1.5 flex justify-center items-center">
                    {post.price}
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
      </div>
    </a>
  );
}
