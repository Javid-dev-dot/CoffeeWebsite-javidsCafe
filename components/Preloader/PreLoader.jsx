"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import "./PreLoader.css";

const WORD_TOP = "JAVID'S";
const WORD_BOTTOM = "CAFE";

export default function Preloader({ onComplete }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cupLiquidRef = useRef(null);
  const counterRef = useRef(null);
  const steamRefs = useRef([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite steam wisps rising from the cup, independent of the main timeline
      steamRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 0, opacity: 0 },
          {
            y: -16,
            opacity: 0.6,
            duration: 1.3,
            repeat: -1,
            yoyo: false,
            delay: i * 0.35,
            ease: "power1.inOut",
            repeatDelay: 0.15,
          },
        );
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (onComplete) onComplete();
          setDone(true);
        },
      });

      const counter = { value: 0 };

      tl.addLabel("fill", "+=0.5")
        // Cup fills up like it's being poured
        .to(
          cupLiquidRef.current,
          { height: "100%", duration: 1.8, ease: "power2.inOut" },
          "fill",
        )
        // Percentage counts 00 -> 100 in sync with the pour
        .to(
          counter,
          {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.floor(counter.value),
                ).padStart(2, "0");
              }
            },
          },
          "fill",
        )
        // Thin rule underneath the counter fills left to right
        .to(
          ".progress-rule-fill",
          { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
          "fill",
        )
        // Everything at the center fades/lifts away
        .to(".preloader-center", {
          opacity: 0,
          y: -40,
          duration: 0.6,
          ease: "power2.in",
        })
        // Panels wipe apart
        .to(
          leftRef.current,
          { x: "-100%", duration: 1.2, ease: "power4.inOut" },
          "+=0.05",
        )
        .to(
          rightRef.current,
          { x: "100%", duration: 1.2, ease: "power4.inOut" },
          "<",
        )
        // Hero scales in as the panels clear
        .to(".hero", { scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.7");
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  const renderLetters = (word, startDelay) =>
    word.split("").map((letter, i) => (
      <motion.span
        key={i}
        className="letter"
        initial={{ y: "115%", opacity: 0, rotateZ: 6 }}
        animate={{ y: "0%", opacity: 1, rotateZ: 0 }}
        transition={{
          delay: startDelay + i * 0.045,
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {letter}
      </motion.span>
    ));

  const topDelay = 0.15;
  const bottomDelay = topDelay + WORD_TOP.length * 0.045 + 0.15;

  return (
    <div className="preloader-container">
      <div ref={leftRef} className="preloader-panel left" />
      <div ref={rightRef} className="preloader-panel right" />

      <div className="preloader-center">
        <div className="steam-wrap" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              ref={(el) => (steamRefs.current[i] = el)}
              className="steam"
            />
          ))}
        </div>

        <div className="cup-icon" aria-hidden="true">
          <div className="cup-liquid" ref={cupLiquidRef} />
          <svg viewBox="0 0 64 64" className="cup-outline">
            <path
              d="M10 22h36v18a14 14 0 0 1-14 14H24a14 14 0 0 1-14-14V22Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M46 26h4a6 6 0 0 1 0 12h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path d="M14 22h28" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>

        <h1 className="preloader-text">
          <span className="line">{renderLetters(WORD_TOP, topDelay)}</span>
          <span className="line accent">
            {renderLetters(WORD_BOTTOM, bottomDelay)}
          </span>
        </h1>

        <div className="counter-row">
          <span className="counter" ref={counterRef}>
            00
          </span>
          <span className="counter-suffix">%</span>
        </div>

        <div className="progress-rule">
          <span className="progress-rule-fill" />
        </div>
      </div>
    </div>
  );
}
