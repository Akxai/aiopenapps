import React from "react";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";
import logo from "../ailogo.png";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrMail } from "react-icons/gr";

export default function Footer() {
  return (
    <footer className="font-mont">
      <div className="footer">
        <div className="top">
          <a href="/">
            <img src={logo} className="ailogo"></img>
          </a>

          <p className="copy">© ai openapps, 2023. | We make people smart</p>
        </div>
        <div className="mainers">
          <div className="mainy">
            <p className="bld">Menu</p>
            <a href="/">Home</a>
          </div>
          <div className="mainy">
            <p className="bld">Community</p>
            <a href="/submit/tool">Submit</a>
            <a href="/blog">Blog</a>
          </div>
          <div className="mainy">
            <p className="bld">Company</p>
            <a href="/about">About us</a>
            <a href="/contact">Contact us</a>
          </div>
        </div>
        <div className="bn">
          <div className="boton">
            <a href="/submit/tool">
              <button type="" className="sub">
                Submit
              </button>
            </a>
          </div>

          <div className="icn">
            <a
              href="https://www.instagram.com/aiopenapps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram className="aif" />
            </a>
            <a
              href="https://twitter.com/aiopenapps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter className="aiff" />
            </a>
            <a
              href="mailto:support@aiopenapps.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrMail className="aifff" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
