"use client";
import React from "react";

import Carouselusage from "@/components/ui/Carouselusage";
import MorphText from "@/components/ui/morph-text";
import LogoULoop from "@/components/Logo loop/Usage";
import HeroSection from "@/components/Herosection/HeroSection";
import VideoSection from "@/components/VideoSection/VideoSection";
import JavidsCafeCoffeeSection from "@/components/JavidCafe coffee/JavidsCafeCoffeeSection";

import CoffeeTypo from "@/components/CoffeeTypo/CoffeeTypo";
import CoffeeCard from "@/components/CoffeeSelector/CoffeeMenuCard";
import "./Structure.css";
import SignatureFooter from "../Footer/SignatureFooter";

const Layout = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero min-h-[70vh] md:min-h-screen w-full bg-[#0a0807] flex items-center justify-center px-4">
        <HeroSection />
      </section>

      {/* Text Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4 text-center">
        <MorphText
          words={["BREW", "AROMA", "BLISS"]}
          interval={3000}
          subtext="Coffee crafted with passion"
          className="text-[#d4af37]"
          textClassName="tracking-tight text-2xl sm:text-3xl md:text-4xl"
          subtextClassName="text-[10px] sm:text-xs mt-4"
        />
      </section>

      <section className="premium-brand-strip w-full bg-[#0a0807] px-4 pb-12 pt-2">
        <div className="premium-brand-inner">
          <span className="premium-brand-kicker">Javid&apos;s Café</span>
          <h2>Small-batch coffee, warm rituals, and slow afternoons.</h2>
          <p>
            Designed for the moments between rush and reset — where
            single-origin beans, precise extraction, and hospitality meet.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="min-h-[60vh] md:min-h-screen w-full bg-[#0a0807] flex items-center justify-center px-4">
        <VideoSection />
      </section>

      {/* Coffee Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4">
        <JavidsCafeCoffeeSection />
      </section>

      {/* Carousel Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] px-4">
        <Carouselusage />
      </section>

      {/* Product Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] px-4">
        <CoffeeCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto" />
      </section>

      {/* Logo Loader Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4">
        <LogoULoop />
      </section>

      {/* Cursor Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] px-4">
        <CoffeeTypo />
      </section>

      {/* Another Text Section */}
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4 text-center">
        <MorphText
          words={["BREW", "AROMA", "BLISS"]}
          interval={3000}
          subtext="Coffee crafted with passion"
          className="text-[#d4af37]"
          textClassName="tracking-tight text-2xl sm:text-3xl md:text-4xl"
          subtextClassName="text-base sm:text-lg mt-4"
        />
      </section>

      <SignatureFooter />
    </main>
  );
};

export default Layout;
