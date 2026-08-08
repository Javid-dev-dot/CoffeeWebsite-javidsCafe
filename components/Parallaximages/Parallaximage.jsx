"use client";
import Image from "next/image";
import { useLenis } from "lenis/react";
import React, { useRef, useEffect } from "react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt, strength = 0.2 }) => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const refid = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1,
        );

        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.05)`;
        }
      }
      refid.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (refid.current) cancelAnimationFrame(refid.current);
    };
  }, []);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * strength;
  });

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden", // ✅ keeps image inside its div
        width: "100%", // ✅ fills parent width
        height: "100%", // ✅ fills parent height
        position: "relative", // required for next/image
      }}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill // ✅ makes image fit parent div
        style={{
          objectFit: "cover", // ✅ clean fit
          transform: "translateY(0) scale(1.05)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ParallaxImage;
