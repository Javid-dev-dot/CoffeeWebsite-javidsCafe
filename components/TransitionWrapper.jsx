"use client";

import { TransitionRouter } from "next-transition-router";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Premium page transition for Javid's Caf\u00e9.
 * A line-art coffee cup (cup, handle, three steam curls) draws itself in
 * as the old route leaves, then draws back out as the new route settles.
 */
const TransitionWrapper = ({ children }) => {
  const overlayRef = useRef(null);
  const wrapRef = useRef(null); // wraps all <path> elements we animate together

  useEffect(() => {
    if (!wrapRef.current) return;
    const paths = wrapRef.current.querySelectorAll("path");
    gsap.set(paths, { drawSVG: "0%" });
  }, []);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const paths = wrapRef.current?.querySelectorAll("path");
        const tl = gsap.timeline({ onComplete: next });

        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.inOut",
        }).to(
          paths,
          {
            drawSVG: "100%",
            duration: 1.1,
            ease: "power2.inOut",
            stagger: 0.08,
          },
          0.1,
        );

        return () => tl.kill();
      }}
      enter={(next) => {
        const paths = wrapRef.current?.querySelectorAll("path");
        const tl = gsap.timeline({ onComplete: next });

        tl.to(paths, {
          drawSVG: "100% 100%",
          duration: 0.9,
          ease: "power2.inOut",
          stagger: 0.06,
        }).to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.35,
        );

        return () => tl.kill();
      }}
    >
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-999 flex items-center justify-center opacity-0 bg-[#120D0A]"
      >
        <svg
          ref={wrapRef}
          width="220"
          height="220"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[42vw] max-w-65 h-auto"
        >
          {/* steam curls */}
          <path
            d="M17 6c-1.6 2-1.6 3.6 0 5.6c1.6 2 1.6 3.6 0 5.6"
            stroke="#C9A227"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M24 4c-1.6 2-1.6 3.6 0 5.6c1.6 2 1.6 3.6 0 5.6"
            stroke="#C9A227"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M31 6c-1.6 2-1.6 3.6 0 5.6c1.6 2 1.6 3.6 0 5.6"
            stroke="#C9A227"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* handle */}
          <path
            d="M34 21h3.5A4.5 4.5 0 0 1 42 25.5v0A4.5 4.5 0 0 1 37.5 30H33.2"
            stroke="#EFDDB0"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* cup body */}
          <path
            d="M10 18h24l-2.4 18.2a4 4 0 0 1-4 3.4H16.4a4 4 0 0 1-4-3.4L10 18Z"
            stroke="#EFDDB0"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* saucer */}
          <path
            d="M8 42c2.6 2.3 8.6 3.8 16 3.8s13.4-1.5 16-3.8"
            stroke="#EFDDB0"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {children}
    </TransitionRouter>
  );
};

export default TransitionWrapper;
