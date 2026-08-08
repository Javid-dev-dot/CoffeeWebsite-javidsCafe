"use client";
import { useLenis } from "lenis/react";
import React, { useRef, useEffect } from "react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxVideo = ({
  src,
  strength = 0.2,
  width = "100%",
  height = "100vh",
}) => {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
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
      if (videoRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1,
        );

        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          videoRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.05)`;
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
        overflow: "hidden",
        width,
        height,
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateY(0) scale(1.05)",
          willChange: "transform",
        }}
      />
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            height: 60vh; /* ✅ smaller hero height on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default ParallaxVideo;
