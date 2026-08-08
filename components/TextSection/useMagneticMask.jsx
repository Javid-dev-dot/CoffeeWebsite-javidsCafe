"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

/**
 * Drives a cursor-following mask via CSS custom properties, animated
 * entirely by GSAP quickTo tweens — no React state updates on mousemove,
 * so it stays smooth regardless of render cost elsewhere on the page.
 *
 * Exposes --mask-x / --mask-y / --mask-size on the target element; your
 * CSS reads those for `mask-position` / `mask-size`.
 */
export default function useMagneticMask(targetRef, { restSize = 44 } = {}) {
  const [supportsHover, setSupportsHover] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return undefined;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSupportsHover(hoverQuery.matches);

    if (!hoverQuery.matches || motionQuery.matches) {
      // Touch / reduced-motion: leave the mask at rest, no listeners.
      el.style.setProperty("--mask-size", `${restSize}px`);
      return undefined;
    }

    el.style.setProperty("--mask-x", "-999px");
    el.style.setProperty("--mask-y", "-999px");
    el.style.setProperty("--mask-size", `${restSize}px`);

    const xTo = gsap.quickTo(el, "--mask-x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "--mask-y", {
      duration: 0.55,
      ease: "power3.out",
    });
    const sizeTo = gsap.quickTo(el, "--mask-size", {
      duration: 0.6,
      ease: "back.out(1.6)",
    });

    // Reveal size scales with the viewport so the effect fully opens up
    // the text on any screen, not just whatever fit a 1440px demo.
    const activeSize = () =>
      Math.hypot(window.innerWidth, window.innerHeight) * 0.9;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    const handleEnter = () => {
      setIsActive(true);
      sizeTo(activeSize());
    };
    const handleLeave = () => {
      setIsActive(false);
      sizeTo(restSize);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
      xTo.tween?.kill();
      yTo.tween?.kill();
      sizeTo.tween?.kill();
    };
  }, [targetRef, restSize]);

  return { supportsHover, isActive };
}
