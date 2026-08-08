"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CoffeeParagraph.css";
gsap.registerPlugin(ScrollTrigger);

const CoffeeParagraph = () => {
  useEffect(() => {
    gsap.from(".coffee_paragraph", {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".coffee_paragraph",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="flex flex-col w-screen relative px-8 py-6 mb-20">
      <p className="coffee_paragraph max-w-2xl mx-auto my-6 text-[1.35rem] leading-relaxed text-center text-coffee-light">
        Coffee is more than a drink — it’s a ritual, a pause, a spark of energy.
        Every cup tells a story of warmth, aroma, and connection. Let each sip
        inspire your day.
      </p>
    </div>
  );
};

export default CoffeeParagraph;
