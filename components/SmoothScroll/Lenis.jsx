"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function smoothScroll(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    const handleScroll = () => ScrollTrigger.update();
    const lenis = lenisRef.current?.lenis;

    if (lenis) document.documentElement.lenis = lenis;
    lenis?.on("scroll", handleScroll);

    gsap.ticker.add(smoothScroll);

    // Refresh ScrollTrigger after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      gsap.ticker.remove(smoothScroll);
      lenis?.off("scroll", handleScroll);
      if (document.documentElement.lenis === lenis) {
        delete document.documentElement.lenis;
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.2,
        touchMultiplier: 2,
        smoothTouch: true,
        infinite: false,
      }}
    >
      <div style={{ width: "100%", minHeight: "100vh" }}>{children}</div>
    </ReactLenis>
  );
}
