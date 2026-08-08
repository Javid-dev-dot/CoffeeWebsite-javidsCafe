"use client";
import ParallaxVideo from "@/components/Parallaximages/Parallaxvideo";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import RotatingText from "@/components/RotatingText/RotatingText";

import "./HeroSection.css";

const BrandText = () => {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.6,
        },
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 0.5,
          transformOrigin: "left center",
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="jc-hero-brand absolute bottom-6 left-4 sm:bottom-10 sm:left-10 z-20 max-w-[92vw] sm:max-w-xl"
    >
      <span className="jc-hero-eyebrow">
        Est. 2024 &mdash; Small Batch Roastery
      </span>

      <h1 className="jc-hero-title">
        Javid&apos;s <em>Caf&eacute;</em>
      </h1>

      <span ref={lineRef} className="jc-hero-rule" />

      <div className="mt-4 sm:mt-6">
        <RotatingText
          texts={[
            "Slow-roasted, always.",
            "Poured with intent.",
            "Your third place.",
            "One cup at a time.",
          ]}
          mainClassName="jc-rotating-pill px-4 sm:px-6 py-2 sm:py-3 overflow-hidden justify-center"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.02}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2400}
          splitBy="characters"
          auto
          loop
        />
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative w-full h-svh overflow-hidden bg-[#120D0A]">
      {/* Background parallax video */}
      <ParallaxVideo src="/assets/Video1.mp4" strength={0.3} />

      {/* Legibility gradient */}
      <div className="jc-hero-scrim absolute inset-0 z-10 pointer-events-none" />

      {/* Circular stamp badge */}
      <motion.div
        className="absolute top-20 right-4 sm:top-28 sm:right-10 z-20"
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
      ></motion.div>

      <BrandText />
    </section>
  );
};

export default HeroSection;
