import React, { useState, useEffect } from "react";
import "../Blog.css";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
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

  return (
    <div className="blog">
      <div className="aiupdate">
        <h2 className="head">AI Updates :</h2>
        <h3 className="lorem">
          Lorem ipsum dolor sit amet consectetur. Morbi gravida sed metus massa
          cras. (Scrolling Content)
        </h3>
      </div>
      <div className="heading">
        <h1 className="header">Explore Latest AI News & Updates</h1>
        <h3 className="para">
          Hunting through the vast Internet, to unearth the best feeds.
        </h3>
      </div>
      <div className="cardpage">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.slug.current}`}
            className="cursor-pointer"
            key={blog.slug.current}
          >
            <div key={blog.slug.current}>
              <div className="cards">
                <div className="img">
                  <img
                    src={
                      blog.mainImage.asset.url ? blog.mainImage.asset.url : " "
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
