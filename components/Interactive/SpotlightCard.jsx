"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;

    if (!card || !spotlight) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });

      gsap.to(spotlight, {
        left: x,
        top: y,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#16110c] p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}