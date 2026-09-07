"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);
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
      <section id="menu" className="home-menu-section w-full bg-[#0a0807]">
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
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (
      !panel ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { opacity: 0.35, y: 40, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        panel.querySelectorAll("[data-cta-reveal]"),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, panel);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="home-cta-section py-16 w-full bg-[#0a0807] px-4">
      <div ref={panelRef} className="home-cta-panel max-w-4xl mx-auto">
        <div className="home-cta-copy">
          <span className="home-cta-kicker" data-cta-reveal>
            Your table is waiting
          </span>
          <h2 data-cta-reveal>
            Ready to Experience
            <span> Javid&apos;s Café?</span>
          </h2>
        </div>
        <div className="home-cta-actions" data-cta-reveal>
          <p>
            Join us for an unforgettable coffee experience. Reserve your table
            today and discover the art of slow coffee.
          </p>
          <div className="home-cta-buttons">
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
        </div>
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
