"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const seenRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const elements = ref.current.querySelectorAll(
        "[data-scroll-reveal='true']"
      );

      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealText({ children, className = "" }) {
  return (
    <span data-scroll-reveal="true" className={className}>
      {children}
    </span>
  );
}