"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./CoffeeHeading.css";
gsap.registerPlugin(ScrollTrigger);

const CoffeeHeading = () => {
  useEffect(() => {
    const split = new SplitType(".coffee-target", { types: "chars" });
    const chars = split.chars;

    gsap.from(chars, {
      opacity: 0,
      y: 80,
      rotateX: -90,
      transformOrigin: "center center",
      ease: "expo.out",
      duration: 1.2,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".coffee_title",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="flex flex-col w-screen relative px-8 py-6 mt-48">
      <h2 className="coffee_title text-[8vw] leading-[0.9] text-center grid gap-8 font-extrabold">
        <span className="uppercase coffee-target">BREW HORIZON</span>
        <span className="uppercase coffee-target">SAVOR THE MOMENT</span>
        <span className="uppercase coffee-target">AWAKEN YOUR SENSES</span>
      </h2>
    </div>
  );
};

export default CoffeeHeading;
