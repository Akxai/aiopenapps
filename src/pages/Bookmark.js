import React, { useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useUserContext } from "../components/UserContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import sanityClient from "../client";

import { doc } from "firebase/firestore";

import { useAuth } from "../components/AuthContext";

export default function Bookmark() {
  const useA = useAuth();
  //   console.log("User Data:", useA);
  const [postData, setPost] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [res, setRes] = useState("");

  const { setUser } = useUserContext();

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInStorage === "true") {
      const displayName = localStorage.getItem("displayName");
      if (displayName) {
        setRes(displayName);
      }
      setLoggedIn(true);
    }
  }, []);

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const res = result.user.displayName;
        setRes(res);
        setUser(result.user);
        setLoggedIn(true);

        console.log("Result", result);
        const userRef = collection(db, "users");
        const email = result.user.email;

        // Check if a document with the user's email already exists
        const querySnapshot = await getDocs(
          query(userRef, where("email", "==", email))
        );

        if (querySnapshot.size === 0) {
          // Document with this email does not exist, so create a new one
          const userData = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: email,
            bookmarks: [],
          };
          localStorage.setItem("uid", result.user.uid);

          console.log("User Data:", userData);

          addDoc(userRef, userData)
            .then(() => {
              console.log("User data added successfully.");
            })
            .catch((error) => {
              console.error("Error adding user data:", error);
            });
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("uid", useA.uid);
        localStorage.setItem("displayName", res);

        const expirationTime = new Date().getTime() + 3600000;
        localStorage.setItem("loginExpiration", expirationTime);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setRes("");
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uid");
    localStorage.removeItem("displayName");
    localStorage.removeItem("loginExpiration");

    setUser(null);
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("loginExpiration");
    if (expirationTime && new Date().getTime() > Number(expirationTime)) {
      handleLogout();
      setUser(null);
    }
  }, []);
  const [fetcherCard, setFetcherCard] = useState(null);
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
        setPost(data);
        const fetcherCard = data.find((card) => card.slug === "fetcher");

        if (fetcherCard) {
          setFetcherCard(fetcherCard);
        }
      })
      .catch(console.error);
  }, []);

  const currentUserData = localStorage.getItem("uid");

  const docRef = doc(db, "users", "Hx3dIumCLX2YgpqyzxJl");
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("fetch bookmark called");

        let userFound = false;
        let userBookmarks = [];

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
  }, []);

  return (
    <div className="mb-8">
      {isLoggedIn ? (
        <div className="mt-32 px-4 md:px-12 lg:px-24 xl:px-36 bookmark-card">
          <h1 className="text-[30px] mt-32 md:text-[44px] lg:text-[44px] sm:text-[30px] text-white font-semibold text-center font-mont leading-snug">
            Bookmarks
          </h1>

          <a className="cursor-pointer">
            <div className="w-full flex justify-evenly mb-8 mt-[20px] flex-wrap gap-x-4 gap-y-8 lg:px-12">
              {userBookmarks.length === 0 ? (
                <p className="font-mont font-bold text-[28px] leading-[34.13px] text-center text-white mt-10">
                  No bookmarks here.<br></br>
                  <span className="font-mont font-bold text-[14px] leading-[34.13px] text-center text-white mt-4">
                    (Please refresh if your bookmarks aren't appearing.)
                  </span>
                </p>
              ) : (
                postData &&
                postData.map((post, index) => {
                  if (userBookmarks.includes(post.slug.current)) {
                    return <BookmarkItem key={index} post={post} />;
                  } else {
                    return null;
                  }
                })
              )}
            </div>
          </a>
        </div>
      ) : (
        <div className="md:px-[10%] lg:px-[10%] px-[5%]">
          <h1 className="text-[30px] mt-32 md:text-[44px] lg:text-[44px] sm:text-[30px] text-white font-semibold text-center font-mont leading-snug">
            Submit New AI Tool
          </h1>
          <div className="mt-8">
            <div className="text-white text-[18px] font-mont font-semibold text-center leading-normal md:leading-[24px] lg:leading-[28px] flex flex-col space-y-3 px-4 md:px-8 lg:px-16 xl:px-24">
              <p className="text-base md:text-lg lg:text-xl">
                Welcome to, <span className="text-[#00FFF2]">AI OPENAPPS</span>.
                a platform integrated with all types of existing & emerging AI’s
                in one place. We are happy to give you the opportunity to
                showcase your AI Tool in our website.
              </p>
              <p className="text-base md:text-lg lg:text-xl">
                Please, Proceed through the following process to continue
                submitting the tool.
              </p>
              <p className="text-base md:text-lg lg:text-xl">
                Continue with your Social Integration with Google. It will only
                take a blip of a second. By creating the account you will be
                able to access the submission process and manage your Tools.
              </p>
            </div>

            <div className="flex justify-center mt-10 px-[10%]">
              <button
                className="bg-white md:px-14 md:py-4 lg:px-14 lg:py-4 px-6 py-4 rounded-2xl"
                onClick={handleGoogleSignIn}
              >
                <svg
                  width="326"
                  height="40"
                  viewBox="0 0 326 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_191_26)">
                    <path
                      d="M39.9789 20.3741C39.9789 18.7353 39.8428 17.5395 39.5483 16.2993H20.3984V23.696H31.639C31.4125 25.5341 30.1887 28.3024 27.4691 30.1625L27.431 30.4102L33.4858 34.9938L33.9053 35.0347C37.7579 31.5578 39.9789 26.4421 39.9789 20.3741Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M20.3985 39.8626C25.9054 39.8626 30.5286 38.0908 33.9054 35.0348L27.4692 30.1626C25.7469 31.3363 23.4352 32.1557 20.3985 32.1557C15.0048 32.1557 10.427 28.6789 8.79518 23.8733L8.55598 23.8931L2.26007 28.6545L2.17773 28.8782C5.53176 35.389 12.4212 39.8626 20.3985 39.8626Z"
                      fill="#34A853"
                    />
                    <path
                      d="M8.79495 23.8732C8.36437 22.633 8.11518 21.3042 8.11518 19.9312C8.11518 18.558 8.36437 17.2293 8.7723 15.9892L8.76089 15.7251L2.38608 10.8872L2.17751 10.9842C0.795153 13.686 0.00195312 16.72 0.00195312 19.9312C0.00195312 23.1423 0.795153 26.1762 2.17751 28.878L8.79495 23.8732Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M20.3985 7.70672C24.2284 7.70672 26.8119 9.32336 28.285 10.6744L34.0413 5.18214C30.5061 1.97099 25.9054 0 20.3985 0C12.4212 0 5.53176 4.47344 2.17773 10.9843L8.77252 15.9893C10.427 11.1837 15.0048 7.70672 20.3985 7.70672Z"
                      fill="#EB4335"
                    />
                  </g>
                  <path
                    d="M65.032 29.24C63.752 29.24 62.56 29.032 61.456 28.616C60.368 28.184 59.416 27.584 58.6 26.816C57.8 26.032 57.176 25.112 56.728 24.056C56.28 23 56.056 21.848 56.056 20.6C56.056 19.352 56.28 18.2 56.728 17.144C57.176 16.088 57.808 15.176 58.624 14.408C59.44 13.624 60.392 13.024 61.48 12.608C62.568 12.176 63.76 11.96 65.056 11.96C66.432 11.96 67.688 12.2 68.824 12.68C69.96 13.144 70.92 13.84 71.704 14.768L69.688 16.664C69.08 16.008 68.4 15.52 67.648 15.2C66.896 14.864 66.08 14.696 65.2 14.696C64.32 14.696 63.512 14.84 62.776 15.128C62.056 15.416 61.424 15.824 60.88 16.352C60.352 16.88 59.936 17.504 59.632 18.224C59.344 18.944 59.2 19.736 59.2 20.6C59.2 21.464 59.344 22.256 59.632 22.976C59.936 23.696 60.352 24.32 60.88 24.848C61.424 25.376 62.056 25.784 62.776 26.072C63.512 26.36 64.32 26.504 65.2 26.504C66.08 26.504 66.896 26.344 67.648 26.024C68.4 25.688 69.08 25.184 69.688 24.512L71.704 26.432C70.92 27.344 69.96 28.04 68.824 28.52C67.688 29 66.424 29.24 65.032 29.24ZM79.6733 29.168C78.3613 29.168 77.1933 28.888 76.1693 28.328C75.1453 27.752 74.3373 26.968 73.7453 25.976C73.1533 24.984 72.8573 23.856 72.8573 22.592C72.8573 21.312 73.1533 20.184 73.7453 19.208C74.3373 18.216 75.1453 17.44 76.1693 16.88C77.1933 16.32 78.3613 16.04 79.6733 16.04C81.0013 16.04 82.1773 16.32 83.2013 16.88C84.2413 17.44 85.0493 18.208 85.6253 19.184C86.2173 20.16 86.5133 21.296 86.5133 22.592C86.5133 23.856 86.2173 24.984 85.6253 25.976C85.0493 26.968 84.2413 27.752 83.2013 28.328C82.1773 28.888 81.0013 29.168 79.6733 29.168ZM79.6733 26.6C80.4093 26.6 81.0653 26.44 81.6413 26.12C82.2173 25.8 82.6653 25.336 82.9853 24.728C83.3213 24.12 83.4893 23.408 83.4893 22.592C83.4893 21.76 83.3213 21.048 82.9853 20.456C82.6653 19.848 82.2173 19.384 81.6413 19.064C81.0653 18.744 80.4173 18.584 79.6973 18.584C78.9613 18.584 78.3053 18.744 77.7293 19.064C77.1693 19.384 76.7213 19.848 76.3853 20.456C76.0493 21.048 75.8813 21.76 75.8813 22.592C75.8813 23.408 76.0493 24.12 76.3853 24.728C76.7213 25.336 77.1693 25.8 77.7293 26.12C78.3053 26.44 78.9533 26.6 79.6733 26.6ZM96.6541 16.04C97.6781 16.04 98.5901 16.24 99.3901 16.64C100.206 17.04 100.846 17.656 101.31 18.488C101.774 19.304 102.006 20.36 102.006 21.656V29H99.0061V22.04C99.0061 20.904 98.7341 20.056 98.1901 19.496C97.6621 18.936 96.9181 18.656 95.9581 18.656C95.2541 18.656 94.6301 18.8 94.0861 19.088C93.5421 19.376 93.1181 19.808 92.8141 20.384C92.5261 20.944 92.3821 21.656 92.3821 22.52V29H89.3821V16.184H92.2381V19.64L91.7341 18.584C92.1821 17.768 92.8301 17.144 93.6781 16.712C94.5421 16.264 95.5341 16.04 96.6541 16.04ZM110.636 29.168C109.228 29.168 108.14 28.808 107.372 28.088C106.604 27.352 106.22 26.272 106.22 24.848V13.352H109.22V24.776C109.22 25.384 109.372 25.856 109.676 26.192C109.996 26.528 110.436 26.696 110.996 26.696C111.668 26.696 112.228 26.52 112.676 26.168L113.516 28.304C113.164 28.592 112.732 28.808 112.22 28.952C111.708 29.096 111.18 29.168 110.636 29.168ZM104.108 18.68V16.28H112.652V18.68H104.108ZM115.984 29V16.184H118.984V29H115.984ZM117.496 14.072C116.936 14.072 116.472 13.896 116.104 13.544C115.752 13.192 115.576 12.768 115.576 12.272C115.576 11.76 115.752 11.336 116.104 11C116.472 10.648 116.936 10.472 117.496 10.472C118.056 10.472 118.512 10.64 118.864 10.976C119.232 11.296 119.416 11.704 119.416 12.2C119.416 12.728 119.24 13.176 118.888 13.544C118.536 13.896 118.072 14.072 117.496 14.072ZM130.193 16.04C131.217 16.04 132.129 16.24 132.929 16.64C133.745 17.04 134.385 17.656 134.849 18.488C135.313 19.304 135.545 20.36 135.545 21.656V29H132.545V22.04C132.545 20.904 132.273 20.056 131.729 19.496C131.201 18.936 130.457 18.656 129.497 18.656C128.793 18.656 128.169 18.8 127.625 19.088C127.081 19.376 126.657 19.808 126.353 20.384C126.065 20.944 125.921 21.656 125.921 22.52V29H122.921V16.184H125.777V19.64L125.273 18.584C125.721 17.768 126.369 17.144 127.217 16.712C128.081 16.264 129.073 16.04 130.193 16.04ZM144.775 29.168C143.687 29.168 142.727 28.968 141.895 28.568C141.063 28.152 140.415 27.528 139.951 26.696C139.487 25.848 139.255 24.784 139.255 23.504V16.184H142.255V23.096C142.255 24.248 142.511 25.112 143.023 25.688C143.551 26.248 144.295 26.528 145.255 26.528C145.959 26.528 146.567 26.384 147.079 26.096C147.607 25.808 148.015 25.376 148.303 24.8C148.607 24.224 148.759 23.512 148.759 22.664V16.184H151.759V29H148.903V25.544L149.407 26.6C148.975 27.432 148.343 28.072 147.511 28.52C146.679 28.952 145.767 29.168 144.775 29.168ZM161.711 29.168C160.287 29.168 159.039 28.888 157.967 28.328C156.911 27.752 156.087 26.968 155.495 25.976C154.919 24.984 154.631 23.856 154.631 22.592C154.631 21.312 154.911 20.184 155.471 19.208C156.047 18.216 156.831 17.44 157.823 16.88C158.831 16.32 159.975 16.04 161.255 16.04C162.503 16.04 163.615 16.312 164.591 16.856C165.567 17.4 166.335 18.168 166.895 19.16C167.455 20.152 167.735 21.32 167.735 22.664C167.735 22.792 167.727 22.936 167.711 23.096C167.711 23.256 167.703 23.408 167.687 23.552H157.007V21.56H166.103L164.927 22.184C164.943 21.448 164.791 20.8 164.471 20.24C164.151 19.68 163.711 19.24 163.151 18.92C162.607 18.6 161.975 18.44 161.255 18.44C160.519 18.44 159.871 18.6 159.311 18.92C158.767 19.24 158.335 19.688 158.015 20.264C157.711 20.824 157.559 21.488 157.559 22.256V22.736C157.559 23.504 157.735 24.184 158.087 24.776C158.439 25.368 158.935 25.824 159.575 26.144C160.215 26.464 160.951 26.624 161.783 26.624C162.503 26.624 163.151 26.512 163.727 26.288C164.303 26.064 164.815 25.712 165.263 25.232L166.871 27.08C166.295 27.752 165.567 28.272 164.687 28.64C163.823 28.992 162.831 29.168 161.711 29.168ZM180.081 29L175.377 16.184H178.209L182.241 27.488H180.897L185.121 16.184H187.641L191.745 27.488H190.425L194.577 16.184H197.241L192.513 29H189.633L185.889 18.992H186.777L182.961 29H180.081ZM199.304 29V16.184H202.304V29H199.304ZM200.816 14.072C200.256 14.072 199.792 13.896 199.424 13.544C199.072 13.192 198.896 12.768 198.896 12.272C198.896 11.76 199.072 11.336 199.424 11C199.792 10.648 200.256 10.472 200.816 10.472C201.376 10.472 201.832 10.64 202.184 10.976C202.552 11.296 202.736 11.704 202.736 12.2C202.736 12.728 202.56 13.176 202.208 13.544C201.856 13.896 201.392 14.072 200.816 14.072ZM211.065 29.168C209.657 29.168 208.569 28.808 207.801 28.088C207.033 27.352 206.649 26.272 206.649 24.848V13.352H209.649V24.776C209.649 25.384 209.801 25.856 210.105 26.192C210.425 26.528 210.865 26.696 211.425 26.696C212.097 26.696 212.657 26.52 213.105 26.168L213.945 28.304C213.593 28.592 213.161 28.808 212.649 28.952C212.137 29.096 211.609 29.168 211.065 29.168ZM204.537 18.68V16.28H213.081V18.68H204.537ZM223.685 16.04C224.709 16.04 225.621 16.24 226.421 16.64C227.237 17.04 227.877 17.656 228.341 18.488C228.805 19.304 229.037 20.36 229.037 21.656V29H226.037V22.04C226.037 20.904 225.765 20.056 225.221 19.496C224.693 18.936 223.949 18.656 222.989 18.656C222.285 18.656 221.661 18.8 221.117 19.088C220.573 19.376 220.149 19.808 219.845 20.384C219.557 20.944 219.413 21.656 219.413 22.52V29H216.413V11.192H219.413V19.64L218.765 18.584C219.213 17.768 219.861 17.144 220.709 16.712C221.573 16.264 222.565 16.04 223.685 16.04ZM247.612 29.24C246.3 29.24 245.092 29.032 243.988 28.616C242.9 28.184 241.948 27.584 241.132 26.816C240.316 26.032 239.684 25.112 239.236 24.056C238.788 23 238.564 21.848 238.564 20.6C238.564 19.352 238.788 18.2 239.236 17.144C239.684 16.088 240.316 15.176 241.132 14.408C241.964 13.624 242.932 13.024 244.036 12.608C245.14 12.176 246.348 11.96 247.66 11.96C249.084 11.96 250.364 12.192 251.5 12.656C252.652 13.12 253.62 13.8 254.404 14.696L252.436 16.616C251.78 15.96 251.068 15.48 250.3 15.176C249.548 14.856 248.716 14.696 247.804 14.696C246.924 14.696 246.108 14.84 245.356 15.128C244.604 15.416 243.956 15.824 243.412 16.352C242.868 16.88 242.444 17.504 242.14 18.224C241.852 18.944 241.708 19.736 241.708 20.6C241.708 21.448 241.852 22.232 242.14 22.952C242.444 23.672 242.868 24.304 243.412 24.848C243.956 25.376 244.596 25.784 245.332 26.072C246.068 26.36 246.884 26.504 247.78 26.504C248.612 26.504 249.412 26.376 250.18 26.12C250.964 25.848 251.708 25.4 252.412 24.776L254.188 27.104C253.308 27.808 252.284 28.344 251.116 28.712C249.964 29.064 248.796 29.24 247.612 29.24ZM251.236 26.696V20.408H254.188V27.104L251.236 26.696ZM263.775 29.168C262.463 29.168 261.295 28.888 260.271 28.328C259.247 27.752 258.439 26.968 257.847 25.976C257.255 24.984 256.959 23.856 256.959 22.592C256.959 21.312 257.255 20.184 257.847 19.208C258.439 18.216 259.247 17.44 260.271 16.88C261.295 16.32 262.463 16.04 263.775 16.04C265.103 16.04 266.279 16.32 267.303 16.88C268.343 17.44 269.151 18.208 269.727 19.184C270.319 20.16 270.615 21.296 270.615 22.592C270.615 23.856 270.319 24.984 269.727 25.976C269.151 26.968 268.343 27.752 267.303 28.328C266.279 28.888 265.103 29.168 263.775 29.168ZM263.775 26.6C264.511 26.6 265.167 26.44 265.743 26.12C266.319 25.8 266.767 25.336 267.087 24.728C267.423 24.12 267.591 23.408 267.591 22.592C267.591 21.76 267.423 21.048 267.087 20.456C266.767 19.848 266.319 19.384 265.743 19.064C265.167 18.744 264.519 18.584 263.799 18.584C263.063 18.584 262.407 18.744 261.831 19.064C261.271 19.384 260.823 19.848 260.487 20.456C260.151 21.048 259.983 21.76 259.983 22.592C259.983 23.408 260.151 24.12 260.487 24.728C260.823 25.336 261.271 25.8 261.831 26.12C262.407 26.44 263.055 26.6 263.775 26.6ZM279.244 29.168C277.932 29.168 276.764 28.888 275.74 28.328C274.716 27.752 273.908 26.968 273.316 25.976C272.724 24.984 272.428 23.856 272.428 22.592C272.428 21.312 272.724 20.184 273.316 19.208C273.908 18.216 274.716 17.44 275.74 16.88C276.764 16.32 277.932 16.04 279.244 16.04C280.572 16.04 281.748 16.32 282.772 16.88C283.812 17.44 284.62 18.208 285.196 19.184C285.788 20.16 286.084 21.296 286.084 22.592C286.084 23.856 285.788 24.984 285.196 25.976C284.62 26.968 283.812 27.752 282.772 28.328C281.748 28.888 280.572 29.168 279.244 29.168ZM279.244 26.6C279.98 26.6 280.636 26.44 281.212 26.12C281.788 25.8 282.236 25.336 282.556 24.728C282.892 24.12 283.06 23.408 283.06 22.592C283.06 21.76 282.892 21.048 282.556 20.456C282.236 19.848 281.788 19.384 281.212 19.064C280.636 18.744 279.988 18.584 279.268 18.584C278.532 18.584 277.876 18.744 277.3 19.064C276.74 19.384 276.292 19.848 275.956 20.456C275.62 21.048 275.452 21.76 275.452 22.592C275.452 23.408 275.62 24.12 275.956 24.728C276.292 25.336 276.74 25.8 277.3 26.12C277.876 26.44 278.524 26.6 279.244 26.6ZM294.76 33.824C293.576 33.824 292.416 33.664 291.28 33.344C290.16 33.04 289.24 32.592 288.52 32L289.864 29.744C290.424 30.208 291.128 30.576 291.976 30.848C292.84 31.136 293.712 31.28 294.592 31.28C296 31.28 297.032 30.952 297.688 30.296C298.344 29.656 298.672 28.688 298.672 27.392V25.112L298.912 22.208L298.816 19.304V16.184H301.672V27.056C301.672 29.376 301.08 31.08 299.896 32.168C298.712 33.272 297 33.824 294.76 33.824ZM294.376 28.424C293.16 28.424 292.056 28.168 291.064 27.656C290.088 27.128 289.312 26.4 288.736 25.472C288.176 24.544 287.896 23.456 287.896 22.208C287.896 20.976 288.176 19.896 288.736 18.968C289.312 18.04 290.088 17.32 291.064 16.808C292.056 16.296 293.16 16.04 294.376 16.04C295.464 16.04 296.44 16.256 297.304 16.688C298.168 17.12 298.856 17.792 299.368 18.704C299.896 19.616 300.16 20.784 300.16 22.208C300.16 23.632 299.896 24.808 299.368 25.736C298.856 26.648 298.168 27.328 297.304 27.776C296.44 28.208 295.464 28.424 294.376 28.424ZM294.832 25.88C295.584 25.88 296.256 25.728 296.848 25.424C297.44 25.104 297.896 24.672 298.216 24.128C298.552 23.568 298.72 22.928 298.72 22.208C298.72 21.488 298.552 20.856 298.216 20.312C297.896 19.752 297.44 19.328 296.848 19.04C296.256 18.736 295.584 18.584 294.832 18.584C294.08 18.584 293.4 18.736 292.792 19.04C292.2 19.328 291.736 19.752 291.4 20.312C291.08 20.856 290.92 21.488 290.92 22.208C290.92 22.928 291.08 23.568 291.4 24.128C291.736 24.672 292.2 25.104 292.792 25.424C293.4 25.728 294.08 25.88 294.832 25.88ZM305.616 29V11.192H308.616V29H305.616ZM318.578 29.168C317.154 29.168 315.906 28.888 314.834 28.328C313.778 27.752 312.954 26.968 312.362 25.976C311.786 24.984 311.498 23.856 311.498 22.592C311.498 21.312 311.778 20.184 312.338 19.208C312.914 18.216 313.698 17.44 314.69 16.88C315.698 16.32 316.842 16.04 318.122 16.04C319.37 16.04 320.482 16.312 321.458 16.856C322.434 17.4 323.202 18.168 323.762 19.16C324.322 20.152 324.602 21.32 324.602 22.664C324.602 22.792 324.594 22.936 324.578 23.096C324.578 23.256 324.57 23.408 324.554 23.552H313.874V21.56H322.97L321.794 22.184C321.81 21.448 321.658 20.8 321.338 20.24C321.018 19.68 320.578 19.24 320.018 18.92C319.474 18.6 318.842 18.44 318.122 18.44C317.386 18.44 316.738 18.6 316.178 18.92C315.634 19.24 315.202 19.688 314.882 20.264C314.578 20.824 314.426 21.488 314.426 22.256V22.736C314.426 23.504 314.602 24.184 314.954 24.776C315.306 25.368 315.802 25.824 316.442 26.144C317.082 26.464 317.818 26.624 318.65 26.624C319.37 26.624 320.018 26.512 320.594 26.288C321.17 26.064 321.682 25.712 322.13 25.232L323.738 27.08C323.162 27.752 322.434 28.272 321.554 28.64C320.69 28.992 319.698 29.168 318.578 29.168Z"
                    fill="black"
                  />
                  <defs>
                    <clipPath id="clip0_191_26">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className="bg-[#7364F4] text-white font-mont text-[18px] p-6 mt-12 mb-12 text-justify rounded-2xl leading-[21.94px] flex flex-col space-y-5">
              <p className="font-bold">New Tool Submission Process:</p>
              <p className="font-medium">
                <span className="font-bold">Step 1: Account Setup</span> - To
                get started, create an account on our platform. Once your
                account is ready, log in and head to the "Submit Tool" section.
              </p>
              <p className="font-medium">
                <span className="font-bold">Step 2: Provide Tool Details</span>{" "}
                - In the "Submit Tool" section, you can furnish all the
                essential details about your tool. We encourage you to provide a
                comprehensive description, use-cases, and any other relevant
                information that will help users understand the value and
                functionality of your tool.
              </p>
              <p className="font-medium">
                By following these simple steps, you can showcase your tool to a
                broader audience and gain recognition for your innovation. We
                believe that this process will help your tool thrive while
                supporting the growth and sustainability of our platform. Thank
                you for being a part of our community!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookmarkItem({ post }) {
  return (
    <a href={"/product/" + post.slug.current} key={post.slug.current}>
      <div className="card">
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
