import React, { useState, useEffect } from "react";
import "../Blog.css";
import pic from "../pic.png";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

const Blog = () => {
  const websites = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur. Sollicitudin.(Title)",

      description:
        "Lorem ipsum dolor sit amet consectetur. Phasellus cursus purus at mattis tellus nisl euismod facilisi sed.",
      image: pic,
      link: "",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur. Sollicitudin.(Title)",

      description:
        " Lorem ipsum dolor sit amet consectetur. Phasellus cursus purus at mattis tellus nisl euismod facilisi sed.",
      image: pic,
    },
    {
      id: 3,
      title: "Chat app",

      description:
        "This is UNDERDEVELOPMENT . This website is Chat application . where you can login and chat with your friends .",
      image: pic,
    },
    {
      id: 5,
      title: "backend App 1",

      description:
        "This is UNDERDEVELOPMENT . This website is Chat application . where you can login and chat with your friends .",
      image: pic,
    },
    {
      id: 6,
      title: "Backend App 2",

      description:
        "This is Backend app 2 A computer program is a sequence or set of instructions in a programming language for a computer to execute",
      image: pic,
    },
    {
      id: 7,
      title: "Backend App 3",

      description:
        "This is Backend app 2 A computer program is a sequence or set of instructions in a programming language for a computer to execute",
      image: pic,
    },
    {
      id: 8,
      title: "MERN site",

      description:
        "This is website 1 and A computer program is a sequence or set of instructions in a programming language for a computer to execute",
      image: pic,
    },
    {
      id: 9,
      title: "MERN site 2 ",

      description:
        "This is website 1 and A computer program is a sequence or set of instructions in a programming language for a computer to execute",
      image: pic,
    },
  ];

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from Sanity
    const query = `*[_type == "blog"]{
      title,
      slug,
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
    }`;

    sanityClient
      .fetch(query)
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // return (
  //   <div className="blog">
  //     <div className="aiupdate">
  //       <h2 className="head">AI Updates :</h2>
  //       <h3 className="lorem">
  //         Lorem ipsum dolor sit amet consectetur. Morbi gravida sed metus massa
  //         cras. (Scrolling Content)
  //       </h3>
  //     </div>
  //     <div className="heading">
  //       <h1 className="header">Explore Latest AI News & Updates</h1>
  //       <h3 className="para">
  //         Hunting through the vast Internet, to unearth the best feeds.
  //       </h3>
  //     </div>
  //     <div className="cardpage">
  //       {websites.map((website) => (
  //         <div key={website.id}>
  //           <div className="cards">
  //             <div className="img">
  //               <img
  //                 src={website.image}
  //                 alt={website.title}
  //                 className="image"
  //               />
  //             </div>
  //             <div className="matter">
  //               <h1 className="title">{website.title}</h1>
  //               <p className="par">{website.description}</p>
  //               <div className="source">
  //                 <p className="ps">Source: XYZ ;</p>
  //                 <p className="ps">Date & Time</p>
  //                 <Link className="link">Link 🔗 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <Link to="/" className="cursor-pointer">
      <div className="blog">
        <div className="aiupdate">
          <h2 className="head">AI Updates :</h2>
          <h3 className="lorem">
            Lorem ipsum dolor sit amet consectetur. Morbi gravida sed metus
            massa cras. (Scrolling Content)
          </h3>
        </div>
        <div className="heading">
          <h1 className="header">Explore Latest AI News & Updates</h1>
          <h3 className="para">
            Hunting through the vast Internet, to unearth the best feeds.
          </h3>
        </div>
        <div className="cardpage">
          {blogs.map(
            (
              blog // Use "blogs" state instead of "websites" array
            ) => (
              <div key={blog.slug.current}>
                <div className="cards">
                  <div className="img">
                    <img
                      src={
                        blog.mainImage.asset.url
                          ? blog.mainImage.asset.url
                          : " "
                      }
                      alt={blog.title}
                      className="image"
                    />
                  </div>
                  <div className="matter">
                    <h1 className="title">{blog.title ? blog.title : " "}</h1>
                    <p className="par">
                      {blog.description.length > 130
                        ? blog.description.substring(0, 130) + "..."
                        : blog.description}
                    </p>
                    <div className="source">
                      <p className="ps pr-4">
                        Source: {blog.source ? blog.source : " "}{" "}
                      </p>
                      <p className="ps">
                        Date & Time:{" "}
                        {blog.publishedAt ? formatDate(blog.publishedAt) : " "}
                      </p>
                      <Link to={blog.url ? blog.url : " "} className="links">
                        Link 🔗{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export default Blog;
