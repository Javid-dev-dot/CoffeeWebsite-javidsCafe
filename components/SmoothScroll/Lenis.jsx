"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    function smoothScroll(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(smoothScroll);

    // Refresh ScrollTrigger on mount (important for Next.js route changes)
    ScrollTrigger.refresh();

    return () => gsap.ticker.remove(smoothScroll);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // GSAP drives Lenis
        duration: 1.2, // smoothness of scroll
        touchMultiplier: 2, // stronger touch scroll
        smoothTouch: true, // smoother mobile scroll
      }}
    >
      <div style={{ width: "100%", overflowX: "hidden" }}>{children}</div>
    </ReactLenis>
  );
}
