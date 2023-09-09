import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";

const BlogPage = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "blog" && slug.current == $slug]{
          title,
          description,
          mainImage {
            asset->{
              _id,
              url
            },
            alt
          },
          source,
          publishedAt
        }`,
        { slug }
      )
      .then((data) => setBlogData(data[0]));
  }, [slug]);

  // Check if blogData has been fetched and render it
  if (!blogData) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  return (
    // <div className="mt-[150px]">
    //   {blogData.title && <h1 className="font-bold">{blogData.title}</h1>}
    //   {blogData.description && <p>{blogData.description}</p>}
    //   {blogData.mainImage && (
    //     <img src={blogData.mainImage.asset.url} alt={blogData.mainImage.alt} />
    //   )}
    //   {blogData.source && <p>{blogData.source}</p>}
    //   {blogData.publishedAt && <p>{formatDate(blogData.publishedAt)}</p>}
    //   {/* Include other details and styling as needed */}
    // </div>
    <div className="container mx-auto py-8 mt-[150px] font-mont lg:px-32 md:px-12 px-4">
      {blogData.title && (
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          {blogData.title}
        </h1>
      )}
      {blogData.mainImage && (
        <img
          src={blogData.mainImage.asset.url}
          alt={blogData.mainImage.alt}
          className="mt-4 max-w-full xl:w-[60%] lg:w-[60%] w-full h-auto rounded-lg mx-auto mb-8"
        />
      )}
      {blogData.description && (
        <p className="text-gray-600 lg:px-20">{blogData.description}</p>
      )}
      {blogData.source && <p className="mt-4 lg:px-20">{blogData.source}</p>}
      {blogData.publishedAt && (
        <p className="mt-4 text-gray-400 lg:px-20">
          {formatDate(blogData.publishedAt)}
        </p>
      )}
      {/* Include other details and styling as needed */}
    </div>
  );
};

export default BlogPage;
