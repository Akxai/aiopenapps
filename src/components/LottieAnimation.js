// LottieAnimation.js
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./lottie/lottie.json";

const LottieAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg", // You can choose 'canvas' or 'svg'
        animationData: animationData,
      });
    }
  }, []);

  return <div ref={containerRef} />;
};

export default LottieAnimation;
