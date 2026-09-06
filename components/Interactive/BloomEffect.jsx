"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BloomEffect({ children, className = "" }) {
  const containerRef = useRef(null);
  const bloomRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !bloomRef.current) return;

    const ctx = gsap.context(() => {
      const bloom = bloomRef.current;

      gsap.fromTo(
        bloom,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(
        bloom,
        {
          scale: 1.5,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={bloomRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[60vw] h-[60vw] bg-[#d4af37]/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>
      {children}
    </div>
  );
}