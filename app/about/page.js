"use client";
import React from "react";

import JourneySection from "@/components/About/JourneySection";
import AboutTextSection from "@/components/About/AboutTextSection";

import AboutReviews from "@/components/About/AboutReviews";
import AboutBrandSection from "@/components/About/AboutBrandSection";

import SignatureFooter from "@/components/Footer/SignatureFooter";
import RoasteryGalleryUsage from "@/components/About/RoasteryGalleryUsage";
import OriginHero from "@/components/About/OriginHero";

import {
  FloatingBackground,
  ReadingProgress,
  AnimatedSeparator,
  ScrollReveal,
  SpotlightCard,
  CoffeeCounter,
} from "@/components/Interactive";
import RippleButton from "@/components/Interactive/RippleButton";

const EnhancedHero = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <OriginHero />
      </section>
    </ScrollReveal>
  );
};

const EnhancedJourney = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <JourneySection />
      </section>
    </ScrollReveal>
  );
};

const EnhancedText = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <AboutTextSection />
      </section>
    </ScrollReveal>
  );
};

const EnhancedGallery = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <RoasteryGalleryUsage />
      </section>
    </ScrollReveal>
  );
};

const EnhancedReviews = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <AboutReviews />
      </section>
    </ScrollReveal>
  );
};

const EnhancedBrand = () => {
  return (
    <ScrollReveal>
      <section className="w-full">
        <AboutBrandSection />
      </section>
    </ScrollReveal>
  );
};

const StorySection = () => {
  return (
    <section className="py-16 px-4 bg-[#0a0807]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SpotlightCard className="p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f5efe6] mb-6">
              Our <span className="text-[#d4af37]">Story</span>
            </h2>
            <p className="text-[#a39482] text-lg leading-relaxed mb-6">
              What started as a passion for exceptional coffee has grown into a
              community gathering place. Every bean we source tells a story of
              its origin, every cup we brew is a moment of connection.
            </p>
            <p className="text-[#a39482] text-lg leading-relaxed">
              We believe in the slow movement — taking time to appreciate the
              craft, the aroma, and the company. Welcome to your third place.
            </p>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const values = [
    {
      title: "Quality",
      description: "Never compromise on the beans, the roast, or the brew.",
    },
    {
      title: "Community",
      description: "A space where everyone feels at home.",
    },
    {
      title: "Sustainability",
      description: "Ethical sourcing and eco-friendly practices.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#0a0807]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5efe6] text-center mb-12">
            Our <span className="text-[#d4af37]">Values</span>
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} delay={index * 0.1}>
              <SpotlightCard className="h-full">
                <h3 className="text-xl font-bold text-[#d4af37] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#a39482]">{value.description}</p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="about-cta-section py-16 px-4 bg-[#0a0807]">
      <div className="about-cta-panel max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5efe6] mb-6">
            Visit <span className="text-[#d4af37]">Javid&apos;s Café</span>
          </h2>
          <p className="text-[#a39482] text-lg mb-8">
            Experience the difference of truly crafted coffee.
          </p>
          <RippleButton
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = "/#reserve")}
            className="font-semibold"
          >
            Reserve Your Spot
          </RippleButton>
        </ScrollReveal>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <>
      <FloatingBackground />
      <ReadingProgress />

      <main className="about-page relative">
        <EnhancedHero />

        <AnimatedSeparator />

        <div className="about-section about-section--journey">
          <EnhancedJourney />
        </div>

        <div className="about-section about-section--text">
          <EnhancedText />
        </div>

        <div className="about-section about-section--gallery">
          <EnhancedGallery />
        </div>

        <div className="about-section about-section--stats">
          <CoffeeCounter />
        </div>

        <div className="about-section about-section--reviews">
          <EnhancedReviews />
        </div>

        <StorySection />

        <ValuesSection />

        <div className="about-section about-section--brand">
          <EnhancedBrand />
        </div>

        <CTASection />

        <SignatureFooter />
      </main>
    </>
  );
};

export default About;
