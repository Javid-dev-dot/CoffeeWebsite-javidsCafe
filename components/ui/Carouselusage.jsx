"use client";
import * as React from "react";
import PerspectiveCarousel from "./PerspectiveCarousel";
import "./Perspective.css";
// requires: npm i motion gsap lucide-react

export default function CarouselUsage() {
  const items = [
    {
      src: "/assets/Landingcafe.jpg",
      title: "Corner window seat",
      eyebrow: "Featured space",
    },
    { src: "/assets/card1.jpg", title: "Espresso bar", eyebrow: "The counter" },
    {
      src: "/assets/card1t.jpeg",
      title: "Pour-over station",
      eyebrow: "Brew method",
    },
    { src: "/assets/cafe2.jpg", title: "Morning light", eyebrow: "Ambience" },
    {
      src: "/assets/card3.jpeg",
      title: "Roastery shelf",
      eyebrow: "In-house roast",
    },
    { src: "/assets/cafe3.jpg", title: "Outdoor patio", eyebrow: "Seating" },
    { src: "/assets/card4.jpeg", title: "Latte art", eyebrow: "Craft" },
    { src: "/assets/card5.jpeg", title: "Reading nook", eyebrow: "Seating" },
    {
      src: "/assets/card2.jpeg",
      title: "Counter view",
      eyebrow: "Perspective",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="flex w-full items-center justify-center bg-[#0a0605] px-4 py-10">
      {/* Height is fluid (vh-based, clamped) so this works from small
          phones up to ultra-wide desktops with no separate breakpoints. */}
      <div className="h-[min(75vh,720px)] min-h-95 w-full max-w-300 overflow-hidden rounded-2xl">
        <PerspectiveCarousel
          items={items}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          draggable
          autoPlay
          autoPlayInterval={2000}
          pauseOnHover
          showDots
          accentColor="#d4af6a"
          surfaceColor="#0b0b0c"
        />
      </div>
    </div>
  );
}
