import React, { useEffect, useReducer, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import { BiLinkExternal, BiSolidUpArrow, BiUpArrow } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useMemo } from "react";
import "../App.css";

import { collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

import { useUserContext } from "../components/UserContext";

import { useAuth } from "../components/AuthContext";

export default function Product() {
  const location = useLocation();
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [ig, forceU] = useReducer((y) => y + 1, 0);

  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userUpvote, setUserUpvote] = useState([]);
  const [allUpvotes, setAllUpvotes] = useState([]);

  const useA = useAuth();
  // console.log("User Data:", useA);

  const memoizedUser = useMemo(() => {
    console.log("User Data:", useA);
    return useA;
  }, [useA]);

  const { user, setUser } = useUserContext();
  // console.log(user);

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInStorage === "true") {
      const displayName = localStorage.getItem("displayName");
      setLoggedIn(true);
    }
  }, []);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]{
          title,
          slug,
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

  const currentUserData = localStorage.getItem("uid");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("fetch bookmark called");

        // Create a flag to check if the user was found
        let userFound = false;
        let userBookmarks = []; // Initialize an array to hold the bookmarks

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid === currentUserData) {
            userFound = true;
            userBookmarks = userData.bookmarks;
          }
        });

        if (!userFound) {
          console.log("User not found.");
        }
        setUserBookmarks(userBookmarks);
        return userBookmarks;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
      }
    };

    fetchUserData()
      .then((bookmarks) => {
        setUserBookmarks(bookmarks);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  }, [ignored]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("fetch upvote called");

        // Create a flag to check if the user was found
        let userFound = false;
        let userUpvotes = []; // Initialize an array to hold the bookmarks

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid === currentUserData) {
            userFound = true;
            userUpvotes = userData.upvote;
          }
        });

        if (!userFound) {
          console.log("User not found.");
        }
        setUserUpvote(userUpvotes);
        return userUpvotes;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
      }
    };

    fetchUserData()
      .then((upvotes) => {
        setUserUpvote(upvotes);
      })
      .catch((error) => {
        console.error("Error fetching upvotes:", error);
      });
  }, [ig]);

  // Inside your Product component

  if (!productData) {
    return <div>Loading...</div>;
  }

  const getAllUserUpvotes = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const allUpvotes = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.upvote) {
          allUpvotes.push(...userData.upvote);
        }
      });
      console.log("ALL upvotes: ", allUpvotes);
      setAllUpvotes(allUpvotes);

      return allUpvotes;
    } catch (error) {
      console.error("Error fetching user upvotes:", error);
      return [];
    }
  };

  const addBookmark = async (bookmarkId) => {
    console.log(bookmarkId);

    if (!useA.uid || !productData || !productData.slug) {
      console.error("User UID, productData, or productData.slug is undefined.");
      alert("Please log in!");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      // Create a flag to check if the user was found
      let userFound = false;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        if (userData.uid === useA.uid) {
          userFound = true;

          if (!userData.bookmarks) {
            userData.bookmarks = [];
          }

          const slugIndex = userData.bookmarks.indexOf(
            productData.slug.current
          );

          if (slugIndex === -1) {
            // The slug is not in the bookmarks, so add it
            userData.bookmarks.push(productData.slug.current);
            setDoc(doc.ref, userData);
            localStorage.setItem("bookmarks", userData.bookmarks);
            userData.bookmarks.map((bookmark, index) =>
              console.log(index, bookmark)
            );
            console.log("Bookmark added successfully");
            console.log("User bookmarks", userData.bookmarks);
            setIsBookmarked(true);
          } else {
            // The slug is already in the bookmarks, so remove it
            userData.bookmarks.splice(slugIndex, 1);
            setDoc(doc.ref, userData);
            localStorage.setItem("bookmarks", userData.bookmarks);
            console.log("Bookmark removed successfully");
            console.log("User bookmarks", userData.bookmarks);

            setIsBookmarked(false);
          }
        }
      });

      if (!userFound) {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error adding/removing bookmark:", error);
    }
    forceUpdate();
  };

  const addUpvote = async (upvoteId) => {
    console.log(upvoteId);

    if (!useA.uid || !productData || !productData.slug) {
      console.error("User UID, productData, or productData.slug is undefined.");
      alert("Please log in!");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      // Create a flag to check if the user was found
      let userFound = false;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        if (userData.uid === useA.uid) {
          userFound = true;

          if (!userData.upvote) {
            userData.upvote = [];
          }

          const slugIndex = userData.upvote.indexOf(productData.slug.current);

          if (slugIndex === -1) {
            // The slug is not in the bookmarks, so add it
            userData.upvote.push(productData.slug.current);
            setDoc(doc.ref, userData);
            localStorage.setItem("upvote", userData.upvote);
            userData.upvote.map((up, index) => console.log(index, up));
            console.log("Upvote added successfully");
            console.log("User upvotes", userData.upvote);
            setIsUpvoted(true);
            getAllUserUpvotes();
          } else {
            // The slug is already in the bookmarks, so remove it
            userData.upvote.splice(slugIndex, 1);
            setDoc(doc.ref, userData);
            localStorage.setItem("upvote", userData.upvote);
            console.log("upvote removed successfully");
            console.log("User upvotes", userData.upvote);

            setIsUpvoted(false);
            getAllUserUpvotes();
          }
        }
      });

      if (!userFound) {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error adding/removing bookmark:", error);
    }
    forceU();
  };

  const getUpvotesCount = () => {
    const currentSlug = productData.slug.current;

    const res = allUpvotes.filter((slug) => slug === currentSlug).length;
    console.log("RES", res);
    console.log(currentSlug);
    getAllUserUpvotes();
    return res;
  };

  return (
    <div className="productbg">
      <div className="px-6 md:px-[20%] ">
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
          <div>
            <p className="font-mont text-base md:text-xl font-semibold">
              Upvotes: {getUpvotesCount()}
            </p>
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
        <div className="flex items-center space-x-2">
          <button
            href=""
            className="bg-[#6D5DF3] px-3 py-[6px] lg:py-[5px] xl:py-[5px] md:py-[5px] text-white font-mont text-sm md:text-base font-semibold rounded-md"
          >
            {productData.price}
          </button>

          {isLoggedIn && (
            <button
              className="bg-[#6D5DF3] px-5 py-1 text-white font-mont text-sm md:text-base font-semibold rounded-md"
              onClick={() => addUpvote(productData.slug.current, useA.uid)}
            >
              {userUpvote.includes(productData.slug.current) ? (
                <BiSolidUpArrow className="w-6 h-6" />
              ) : (
                <BiUpArrow className="w-6 h-6" />
              )}
            </button>
          )}

          {isLoggedIn && (
            <button
              className="bg-[#6D5DF3] px-5 py-1 text-white font-mont text-sm md:text-base font-semibold rounded-md"
              onClick={() => addBookmark(productData.slug.current, useA.uid)}
            >
              {userBookmarks.includes(productData.slug.current) ? (
                <BsFillBookmarkFill className="w-6 h-6" />
              ) : (
                <BsBookmark className="w-6 h-6" />
              )}
            </button>
          )}

          <Link
            to={productData.url}
            target="_blank"
            className="bg-[#6D5DF3] px-5 py-1 text-white font-mont text-sm md:text-base font-semibold rounded-md"
          >
            <BiLinkExternal className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-6 md:mt-8 px-4 md:px-10 lg:px-20 xl:px-40 mb-14">
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
