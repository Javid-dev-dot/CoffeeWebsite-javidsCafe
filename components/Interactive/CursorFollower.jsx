"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const distanceX = mouseX - currentX;
      const distanceY = mouseY - currentY;

      currentX += distanceX * 0.1;
      currentY += distanceY * 0.1;

      gsap.set(cursor, {
        left: mouseX,
        top: mouseY,
      });

      gsap.set(follower, {
        left: currentX,
        top: currentY,
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 -mt-1 -ml-1 bg-[#d4af37] rounded-full mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 -mt-4 -ml-4 border-2 border-[#d4af37]/50 rounded-full transition-colors duration-300"
      />
    </>
  );
}