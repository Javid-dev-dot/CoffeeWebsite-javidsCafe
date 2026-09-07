"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./CoffeeHeading.css";
gsap.registerPlugin(ScrollTrigger);

const CoffeeHeading = () => {
  useEffect(() => {
    const split = new SplitType(".coffee-target", {
      types: "chars",
      tagName: "span",
      charClass: "coffee-char",
    });
    const chars = split.chars;

    chars.forEach((char) => {
      char.style.display = "inline-block";
      char.style.color = "transparent";
      char.style.background =
        "linear-gradient(135deg, #f5efe6 0%, #d4af37 60%, #ff9e2c 100%)";
      char.style.WebkitBackgroundClip = "text";
      char.style.backgroundClip = "text";
      char.style.WebkitTextFillColor = "transparent";
    });

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 80,
        rotateX: -90,
        transformOrigin: "center center",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "expo.out",
        duration: 1.2,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".coffee_title",
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div className="flex flex-col w-full relative px-8 py-6 mt-48">
      <h2 className="coffee_title text-[clamp(2.5rem,8vw,9rem)] leading-[0.9] text-center grid gap-4 font-extrabold mx-auto max-w-[95vw]">
        <span className="uppercase coffee-target">BREW HORIZON</span>
        <span className="uppercase coffee-target">SAVOR THE MOMENT</span>
        <span className="uppercase coffee-target">AWAKEN YOUR SENSES</span>
      </h2>
    </div>
  );
};

export default CoffeeHeading;
