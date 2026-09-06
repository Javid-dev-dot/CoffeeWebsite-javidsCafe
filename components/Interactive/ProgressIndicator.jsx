"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReadingProgress() {
  const progressRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const progressBar = progressRef.current;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      gsap.to(progressBar, {
        width: `${scrollPercent}%`,
        duration: 0.1,
        ease: "none",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-[#d4af37] via-[#ff9e2c] to-[#d4af37]"
        style={{ width: "0%" }}
      />
    </div>
  );
}