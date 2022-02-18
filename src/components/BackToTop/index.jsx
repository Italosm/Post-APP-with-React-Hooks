import React, { useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import "./styles.css";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <HiChevronDoubleUp
      className="scrollTop"
      onClick={scrollTop}
      style={{ height: 50, display: showScroll ? "flex" : "none" }}
    />
  );
};

export default ScrollArrow;
