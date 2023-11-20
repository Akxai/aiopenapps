import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Footer.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";
import { RiArrowUpLine } from "react-icons/ri";
import { IoMdArrowRoundUp } from "react-icons/io";
import { TiArrowSortedUp } from "react-icons/ti";
import "../App.css";

function TopScroll({ setScrolTop }) {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {scrollTop && (
        // <button type="" style={{ background:'black' , color :"white" , padding : '1rem', borderRadius:'0.3rem'}} onClick={scrollup}>scroll up</button>
        // <RiArrowUpLine onClick={scrollup} className="uparrow" />
        // <IoMdArrowRoundUp onClick={scrollup} className="uparrow" />
        <TiArrowSortedUp onClick={scrollup} className="uparrow" />
      )}
    </div>
  );
}

export default TopScroll;
