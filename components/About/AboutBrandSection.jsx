"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CiCoffeeCup } from "react-icons/ci";
import { DiCoffeescript } from "react-icons/di";
import { GiCoffeePot } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";
import { MdCoffeeMaker } from "react-icons/md";
import { TbCoffee } from "react-icons/tb";
import { PiCoffeeBeanFill } from "react-icons/pi";
import LogoLoop from "@/components/Logo loop/Logoloop";
import "./AboutBrandSection.css";

gsap.registerPlugin(ScrollTrigger);

const logoItems = [
  { node: <CiCoffeeCup /> },
  { node: <DiCoffeescript /> },
  { node: <GiCoffeePot /> },
  { node: <SiBuymeacoffee /> },
  { node: <MdCoffeeMaker /> },
  { node: <TbCoffee /> },
  { node: <PiCoffeeBeanFill /> },
];

const logoItems2 = [
  { node: <GiCoffeePot /> },
  { node: <PiCoffeeBeanFill /> },
  { node: <CiCoffeeCup /> },
  { node: <TbCoffee /> },
  { node: <DiCoffeescript /> },
  { node: <MdCoffeeMaker /> },
  { node: <SiBuymeacoffee /> },
];

const BRAND_WORDS = [
  { text: "Javid's", type: "brand" },
  { text: "Café", type: "brand" },
  { text: "—", type: "separator" },
  { text: "Where", type: "normal" },
  { text: "Coffee", type: "highlight" },
  { text: "Meets", type: "normal" },
  { text: "Craft", type: "highlight" },
];

function HighlightWord({ word, index }) {
  return (
    <motion.span
      className={`brand-text-word brand-text-word--${word.type}`}
      initial={{ opacity: 0, y: 60, rotateX: -40 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      {word.text}
    </motion.span>
  );
}

export default function AboutBrandSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll parallax on brand name
      gsap.to(".brand-bg-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-brand-section" id="brand">
      {/* Giant BG text */}
      <div className="brand-bg-text-wrap" aria-hidden>
        <span className="brand-bg-text">JAVID'S CAFÉ</span>
      </div>

      {/* Background glow */}
      <div className="about-brand__bg-glow" />

      {/* Top logo loop (icons, left) */}
      <div className="about-brand__loop-top">
        <LogoLoop
          logos={logoItems}
          speed={70}
          direction="left"
          brandName="Javid's Café"
          brandEvery={4}
          logoHeight={28}
          gap={32}
          fadeOut
          scaleOnHover
          fadeOutColor="#0c0704"
        />
      </div>

      {/* Main brand reveal */}
      <motion.div className="about-brand__content" style={{ scale, opacity }}>
        {/* Badge */}
        <motion.div
          className="about-brand__badge"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <svg viewBox="0 0 120 120" className="about-brand__badge-svg">
            <path
              id="brandCircle"
              d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
              fill="none"
            />
            <text fontSize="9.5" fill="#c9a227" letterSpacing="4">
              <textPath href="#brandCircle">
                ✦ ARTISAN ROASTERY ✦ HYDERABAD ✦ INDIA ✦{" "}
              </textPath>
            </text>
          </svg>
          <div className="about-brand__badge-icon">
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path
                d="M4 8h13v6.5A4.5 4.5 0 0 1 12.5 19h-4A4.5 4.5 0 0 1 4 14.5V8Z"
                stroke="#c9a227"
                strokeWidth="1.3"
              />
              <path
                d="M17 9.5h1.6a2.4 2.4 0 0 1 0 4.8H17"
                stroke="#c9a227"
                strokeWidth="1.3"
              />
              <path
                d="M7 5.2c0-.9.9-1.1.9-1.9M10.6 5.2c0-.9.9-1.1.9-1.9"
                stroke="#c9a227"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Giant headline */}
        <div ref={titleRef} className="about-brand__headline">
          {BRAND_WORDS.map((w, i) => (
            <HighlightWord key={i} word={w} index={i} />
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="about-brand__tagline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          Since 2024 — crafting moments one cup at a time.
          <br />
          <em>Slow-roasted. Always.</em>
        </motion.p>

        {/* Horizontal divider with coffee bean icons */}
        <motion.div
          className="about-brand__divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <span className="about-brand__divider-line" />
          <span className="about-brand__divider-icon">✦</span>
          <span className="about-brand__divider-line" />
        </motion.div>

        {/* Brand pillars */}
        <motion.div
          className="about-brand__pillars"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          {[
            { icon: "☕", label: "Artisan Roastery" },
            { icon: "🌿", label: "Single Origin" },
            { icon: "🔥", label: "Small Batch" },
            { icon: "✨", label: "Est. 2024" },
          ].map((p, i) => (
            <div key={i} className="about-brand__pillar">
              <span className="about-brand__pillar-icon">{p.icon}</span>
              <span className="about-brand__pillar-label">{p.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom logo loop (right) */}
      <div className="about-brand__loop-bottom">
        <LogoLoop
          logos={logoItems2}
          speed={55}
          direction="right"
          brandName="Javid's Café"
          brandEvery={3}
          logoHeight={28}
          gap={32}
          fadeOut
          scaleOnHover
          fadeOutColor="#0c0704"
        />
      </div>
    </section>
  );
}
