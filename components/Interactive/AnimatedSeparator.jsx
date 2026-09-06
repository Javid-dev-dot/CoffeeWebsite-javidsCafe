"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedSeparator() {
  const separatorRef = useRef(null);

  useEffect(() => {
    if (!separatorRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: separatorRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      separatorRef.current.querySelector(".js-separator-line"),
      {
        scaleX: 0,
        transformOrigin: "left center",
      },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power4.inOut",
      }
    );

    tl.fromTo(
      separatorRef.current.querySelectorAll(".js-separator-dot"),
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <div
      ref={separatorRef}
      className="flex items-center justify-center my-16 gap-4"
    >
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
      <span className="text-[#a39482] text-sm uppercase tracking-widest">
        Experience
      </span>
      <div className="flex gap-2">
        <span className="w-1 h-1 bg-[#d4af37] rounded-full js-separator-dot" />
        <span className="w-1 h-1 bg-[#d4af37] rounded-full js-separator-dot" />
        <span className="w-1 h-1 bg-[#d4af37] rounded-full js-separator-dot" />
      </div>
      <span className="text-[#a39482] text-sm uppercase tracking-widest">
        Journey
      </span>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
    </div>
  );
}