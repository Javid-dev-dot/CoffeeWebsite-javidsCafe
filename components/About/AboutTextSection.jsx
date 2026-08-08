"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import CursorSection from "@/components/CursorSection/CursorSection";
import "./AboutTextSection.css";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "ROASTED", highlight: false },
  { text: "WITH", highlight: false },
  { text: "SOUL", highlight: true },
  { text: "BREWED", highlight: false },
  { text: "WITH", highlight: false },
  { text: "PASSION", highlight: true },
  { text: "SERVED", highlight: false },
  { text: "WITH", highlight: false },
  { text: "CARE", highlight: true },
];

// Animated SVG Coffee steam paths
function CoffeeSteamSVG({ animate }) {
  return (
    <svg
      className="about-text-steam"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cup base */}
      <path
        d="M60 100 L65 140 Q100 148 135 140 L140 100 Z"
        stroke="rgba(201,162,39,0.4)"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="55"
        y1="100"
        x2="145"
        y2="100"
        stroke="rgba(201,162,39,0.4)"
        strokeWidth="2"
      />
      {/* Handle */}
      <path
        d="M135 108 Q158 108 158 120 Q158 132 135 132"
        stroke="rgba(201,162,39,0.4)"
        strokeWidth="2"
        fill="none"
      />
      {/* Steam paths */}
      <path
        className={`steam-path steam-path-1 ${animate ? "animating" : ""}`}
        d="M80 96 C82 84 76 78 78 66 C80 54 86 48 84 36"
        stroke="rgba(201,162,39,0.6)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className={`steam-path steam-path-2 ${animate ? "animating" : ""}`}
        d="M100 94 C102 80 96 72 98 58 C100 44 108 38 106 24"
        stroke="rgba(201,162,39,0.7)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className={`steam-path steam-path-3 ${animate ? "animating" : ""}`}
        d="M120 96 C122 82 116 74 118 60 C120 46 128 40 126 26"
        stroke="rgba(201,162,39,0.5)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Word reveal with scroll
function ScrollWord({ word, index, isHighlight }) {
  const ref = useRef(null);

  return (
    <motion.span
      ref={ref}
      className={`about-text-word ${isHighlight ? "about-text-word--gold" : ""} cursor-target`}
      initial={{ opacity: 0, y: 50, skewX: 8 }}
      whileInView={{ opacity: 1, y: 0, skewX: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
    >
      {word}
    </motion.span>
  );
}

export default function AboutTextSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [steamAnimate, setSteamAnimate] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSteamAnimate(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-text-section" id="about-text">
      {/* Cursor */}
      <CursorSection
        cursorColor="#c9a227"
        cursorColorOnTarget="#ffffff"
        targetSelector=".about-text-word--gold"
        spinDuration={3}
        hideDefaultCursor={false}
      />

      {/* Background motion */}
      <motion.div className="about-text-bg-layer" style={{ y: bgY }} />

      {/* SVG Steam art */}
      <div className="about-text-svg-container">
        <CoffeeSteamSVG animate={steamAnimate} />
      </div>

      {/* Decorative ring */}
      <div className="about-text-ring">
        <svg viewBox="0 0 300 300" fill="none">
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(201,162,39,0.08)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <circle
            cx="150"
            cy="150"
            r="110"
            stroke="rgba(201,162,39,0.05)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="about-text-inner">
        <motion.p
          className="about-text-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Philosophy
        </motion.p>

        {/* Giant word display */}
        <div ref={headingRef} className="about-text-words">
          {WORDS.map((w, i) => (
            <ScrollWord
              key={i}
              word={w.text}
              index={i}
              isHighlight={w.highlight}
            />
          ))}
        </div>

        {/* Sub paragraph */}
        <motion.p
          className="about-text-para"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          At Javid&apos;s Café, every single cup is a conversation between
          origin and craft. We believe great coffee is never rushed — it is
          tended, tasted, and transformed into an experience worth remembering.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="about-text-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          {[
            { value: "4+", label: "Years of Craft" },
            { value: "12", label: "Origin Beans" },
            { value: "5K+", label: "Happy Regulars" },
            { value: "100%", label: "Single Origin" },
          ].map((stat, i) => (
            <div key={i} className="about-text-stat cursor-target">
              <span className="about-text-stat__value">{stat.value}</span>
              <span className="about-text-stat__label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom SVG wave */}
      <div className="about-text-bottom-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
          <path
            d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z"
            fill="#0c0704"
          />
        </svg>
      </div>
    </section>
  );
}
