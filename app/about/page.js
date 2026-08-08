"use client";
import React from "react";

import JourneySection from "@/components/About/JourneySection";
import AboutTextSection from "@/components/About/AboutTextSection";

import AboutReviews from "@/components/About/AboutReviews";
import AboutBrandSection from "@/components/About/AboutBrandSection";

import SmoothScrollProvider from "@/components/SmoothScroll/Lenis";
import SignatureFooter from "@/components/Footer/SignatureFooter";
import RoasteryGalleryUsage from "@/components/About/RoasteryGalleryUsage";
import OriginHero from "@/components/About/OriginHero";

const About = () => {
  return (
    <SmoothScrollProvider>
      <main className="about-page">
        {/* 1 — Hero Section */}
        <OriginHero />

        {/* 2 — Journey Story (cards + SVG drip connector) */}
        <JourneySection />

        {/* 3 — Text Section with SVG animation + cursor effect */}
        <AboutTextSection />

        {/* 4 — Infinite Scroll Gallery with parallax */}
        <RoasteryGalleryUsage />
        {/* 5 — Reviews section */}
        <AboutReviews />

        {/* 6 — Brand Highlight + Logo Loop */}
        <AboutBrandSection />
      </main>
      <SignatureFooter />
    </SmoothScrollProvider>
  );
};

export default About;
