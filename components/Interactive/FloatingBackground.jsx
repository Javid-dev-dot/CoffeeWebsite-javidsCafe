"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingBackground() {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const blobs = blobsRef.current;
    if (!blobs.length) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    blobs.forEach((blob, i) => {
      const delay = i * 2;
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const scale = 1 + Math.random() * 0.5;
      const duration = 15 + Math.random() * 10;

      tl.to(
        blob,
        {
          x: x,
          y: y,
          scale: scale,
          duration: duration,
          ease: "sine.inOut",
          delay: delay,
        },
        0
      );
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div
        ref={(el) => (blobsRef.current[0] = el)}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#d4af37]/10 rounded-full blur-[100px] mix-blend-screen"
      />
      <div
        ref={(el) => (blobsRef.current[1] = el)}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#ff9e2c]/10 rounded-full blur-[120px] mix-blend-screen"
      />
      <div
        ref={(el) => (blobsRef.current[2] = el)}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-[#a39482]/5 rounded-full blur-[80px] mix-blend-multiply"
      />
    </div>
  );
}