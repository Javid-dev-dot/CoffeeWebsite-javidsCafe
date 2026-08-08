"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

const Text = ({ delay = 0, variant = "hero" }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Split text into words for animation
    const split = SplitText.create(el, {
      type: "words",
      mask: "words",
    });

    gsap.set(el, { opacity: 1 });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });

    gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: variant === "logo" ? 0.75 : 0.95,
      ease: "power3.out",
      stagger: variant === "logo" ? 0.05 : 0.075,
      delay,
    });

    return () => {
      gsap.killTweensOf(split.words);
      gsap.killTweensOf(el);
      split.revert();
    };
  }, [delay, variant]);

  const shadow = " [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 sm:bottom-20 sm:left-20 z-20">
      <h1
        ref={elRef}
        className={`text-[clamp(2.25rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-tight text-white max-sm:text-center md:text-left${shadow} opacity-0`}
      ></h1>
    </div>
  );
};

export default Text;
