"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const [hasClicked, setHasClicked] = useState(false);

  const handleConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const particleCount = 150;
    const spread = 360;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount,
        angle: 60,
        spread: spread,
        origin: { x: 0 },
        colors: ["#d4af37", "#ff9e2c", "#f5efe6", "#16110c"],
        disableForReducedMotion: true,
      });

      confetti({
        particleCount,
        angle: 120,
        spread: spread,
        origin: { x: 1 },
        colors: ["#d4af37", "#ff9e2c", "#f5efe6", "#16110c"],
        disableForReducedMotion: true,
      });

      requestAnimationFrame(frame);
    };

    frame();
    setHasClicked(true);
  };

  const handleClick = (e) => {
    handleConfetti();
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
      {hasClicked && (
        <span className="ml-2 animate-pulse">🎉</span>
      )}
    </button>
  );
}

export function ConfettiOnInteraction({ trigger }) {
  useEffect(() => {
    if (!trigger) return;

    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#d4af37", "#ff9e2c", "#f5efe6"],
        disableForReducedMotion: true,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [trigger]);

  return null;
}