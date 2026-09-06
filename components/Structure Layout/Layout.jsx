"use client";
import React, { useRef, useEffect } from "react";

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

import {
  FloatingBackground,
  ReadingProgress,
  CoffeeCounter,
  AnimatedSeparator,
  RippleButton,
  ScrollReveal,
} from "@/components/Interactive";
const AnimatedHero = () => {
  return (
    <div>
      <section className="hero min-h-[70vh] md:min-h-screen w-full bg-[#0a0807] flex items-center justify-center px-4">
        <HeroSection />
      </section>
    </div>
  );
};

const EnhancedTextSection = () => {
  return (
    <ScrollReveal>
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
    </ScrollReveal>
  );
};

const BrandStorySection = () => {
  return (
    <ScrollReveal>
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
    </ScrollReveal>
  );
};

const EnhancedVideoSection = () => {
  return (
    <ScrollReveal>
      <section className="min-h-[60vh] md:min-h-screen w-full bg-[#0a0807] flex items-center justify-center px-4">
        <VideoSection />
      </section>
    </ScrollReveal>
  );
};

const EnhancedCoffeeSection = () => {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4">
        <JavidsCafeCoffeeSection />
      </section>
    </ScrollReveal>
  );
};

const EnhancedCarouselSection = () => {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] px-4">
        <Carouselusage />
      </section>
    </ScrollReveal>
  );
};

const EnhancedProductSection = () => {
  return (
    <ScrollReveal>
      <section
        id="menu"
        className="home-menu-section w-full bg-[#0a0807]"
      >
        <CoffeeCard />
      </section>
    </ScrollReveal>
  );
};

const EnhancedLogoSection = () => {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4">
        <LogoULoop />
      </section>
    </ScrollReveal>
  );
};

const EnhancedTypoSection = () => {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] px-4">
        <CoffeeTypo />
      </section>
    </ScrollReveal>
  );
};

const FinalTextSection = () => {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-24 md:py-32 w-full bg-[#0a0807] flex items-center justify-center px-4 text-center">
        <MorphText
          words={["ENJOY", "SIP", "RELAX"]}
          interval={3000}
          subtext="Every cup tells a story"
          className="text-[#d4af37]"
          textClassName="tracking-tight text-2xl sm:text-3xl md:text-4xl"
          subtextClassName="text-base sm:text-lg mt-4"
        />
      </section>
    </ScrollReveal>
  );
};

const CTASection = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="home-cta-section py-16 w-full bg-[#0a0807] px-4">
      <div className="home-cta-panel max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5efe6] mb-6">
            Ready to Experience
            <span className="text-[#d4af37]"> Javid&apos;s Café</span>?
          </h2>
          <p className="text-[#a39482] text-lg mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable coffee experience. Reserve your table
            today and discover the art of slow coffee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <RippleButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("reserve")}
              className="font-semibold"
            >
              Reserve a Table
            </RippleButton>
            <RippleButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("menu")}
              className="font-semibold"
            >
              View Our Menu
            </RippleButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Layout = () => {
  return (
    <main className="home-page relative">
      <FloatingBackground />
      <ReadingProgress />

      <AnimatedHero />

      <EnhancedTextSection />

      <BrandStorySection />

      <AnimatedSeparator />

      <EnhancedVideoSection />

      <AnimatedSeparator />

      <EnhancedCoffeeSection />

      <CoffeeCounter />

      <EnhancedCarouselSection />

      <EnhancedProductSection />

      <AnimatedSeparator />

      <EnhancedLogoSection />

      <EnhancedTypoSection />

      <FinalTextSection />

      <CTASection />

      <SignatureFooter />
    </main>
  );
};

export default Layout;
