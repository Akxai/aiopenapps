import React from "react";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B] px-16 py-8 flex flex-col lg:flex-row justify-between text-white font-mont">
      <div className="flex flex-col justify-between gap-y-4 pb-3 items-center lg:items-start">
        <Link to="/">
          <img
            src="/logo.png"
            width={212}
            height={50}
            alt="logo"
            className="w-[212px] mx-auto lg:mx-0 cursor-pointer"
          />
        </Link>
        <p className="text-[15px] text-center lg:text-left">
          © ai openapps, 2023. | We make people smart
        </p>
      </div>
      <div className="flex gap-x-16 mt-4 lg:mt-0 flex-wrap">
        <div className="flex flex-col gap-y-3 mb-5">
          <p className="font-bold text-[15px]">Menu</p>
          <ul className="flex flex-col gap-y-2">
            <a href="#">
              <li className="text-[13px]">Home</li>
            </a>
            {/* <a href="#">
              <li className="text-[13px]">Top 100</li>
            </a>
            <a href="#">
              <li className="text-[13px]">Trending AI</li>
            </a> */}
          </ul>
        </div>
        <div className="flex flex-col gap-y-3 mb-5">
          <p className="font-bold text-[15px]">Community</p>
          <ul className="flex flex-col gap-y-2">
            <a href="/submit/tool">
              <li className="text-[13px]">Submit</li>
            </a>
            {/* <a href="#">
              <li className="text-[13px]">Blogs</li>
            </a> */}
          </ul>
        </div>
        <div className="flex flex-col gap-y-3 mb-5">
          <p className="font-bold text-[15px]">Company</p>
          <ul className="flex flex-col gap-y-2">
            <a href="/about">
              <li className="text-[13px]">About us</li>
            </a>
            <a href="/contact">
              <li className="text-[13px]">Contact us</li>
            </a>
          </ul>
        </div>
        <div className="ml-14">
          <Link
            to="/submit/tool"
            className="bg-[#9747FF] flex justify-center items-center py-1.5 font-mont font-medium rounded-md w-full"
          >
            Submit
          </Link>
          <div className="flex justify-evenly gap-x-2 mt-4 items-center">
            <SocialIcon
              url="https://www.instagram.com/aiopenapps/"
              target="_blank"
              style={{ width: 40, height: 40 }}
            />
            <SocialIcon
              url="https://twitter.com/aiopenapps"
              target="_blank"
              style={{ width: 40, height: 40 }}
            />
            <SocialIcon
              url="mailto:support@aiopenapps.com"
              target="_blank"
              style={{ width: 40, height: 40 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
