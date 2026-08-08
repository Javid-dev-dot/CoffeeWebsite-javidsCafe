"use client";
import React from "react"; // ✅ Import useCallback

import SmoothScrollProvider from "@/components/SmoothScroll/Lenis";

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
    <SmoothScrollProvider>
      <main>
        {/* Hero Section */}
        <section className="hero min-h-screen w-full bg-[#561C24] flex items-center justify-center">
          <HeroSection />
        </section>

        {/* Text Section */}
        <section className="py-32 w-full bg-[#E8D8C4] flex items-center justify-center">
          <MorphText
            words={["BREW", "AROMA", "BLISS"]}
            interval={3000}
            subtext="Coffee crafted with passion"
            className="text-[#561C24]"
            textClassName="tracking-tight text-4xl"
            subtextClassName="text-lg mt-4"
          />
        </section>

        {/* Video Section */}
        <section className="min-h-screen w-full bg-[#561C24] flex items-center justify-center">
          <VideoSection />
        </section>

        {/* Text Section */}
        <section className="py-32 w-full bg-[#6D2932] flex items-center justify-center">
          <JavidsCafeCoffeeSection />
        </section>

        {/* Carousel Section */}
        <section className="py-32 w-full bg-[#C7B7A3]">
          <Carouselusage />
        </section>

        {/* Product Section */}
        <section className="py-32 w-full bg-[#6D2932]">
          <CoffeeCard />
        </section>

        {/* Logo Loader Section */}
        <section className="py-32 w-full bg-[#6D2932] flex items-center justify-center">
          <LogoULoop />
        </section>

        {/* Cursor Section */}
        <section className="py-32 w-full bg-[#6D2932]">
          <CoffeeTypo />
        </section>

        {/* Another Text Section */}
        <section className="py-32 w-full bg-[#E8D8C4] flex items-center justify-center">
          <MorphText
            words={["BREW", "AROMA", "BLISS"]}
            interval={3000}
            subtext="Coffee crafted with passion"
            className="text-[#561C24]"
            textClassName="tracking-tight text-4xl"
            subtextClassName="text-lg mt-4"
          />
        </section>
      </main>
      <SignatureFooter />
    </SmoothScrollProvider>
  );
};

export default Layout;
