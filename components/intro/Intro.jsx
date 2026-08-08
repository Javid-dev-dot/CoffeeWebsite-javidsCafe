"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

export const IMAGES = [
  "/assets/coffeebeans.jpg",
  "/assets/Fuelcoffee.jpg",
  "/assets/coffeecolors.jpg",
  "/assets/coffeecall.jpg",
  "/assets/Coffeetime.jpg", // last one will scale
];

export const INTRO_END_DELAY_SEC = 0.35 + (IMAGES.length - 1) * 0.25 + 1 + 1;
console.log(INTRO_END_DELAY_SEC);

const Intro = () => {
  const refs = useRef([]); // image wrapper refs
  const containerRef = useRef(null);
  const radialRef = useRef(null);

  useEffect(() => {
    const imgs = refs.current.filter(Boolean);
    if (!imgs.length) return;

    const timeline = gsap.timeline();

    // Animate images in sequence
    timeline.to(imgs, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      delay: 0.35,
      stagger: { each: 0.25, ease: "power1.out" },
    });

    // Expand container
    timeline.to(containerRef.current, {
      width: "100%",
      height: "100dvh",
      maxWidth: "none",
      aspectRatio: "unset",
      margin: 0,
      duration: 1,
      ease: "power3.inOut",
    });

    // Fade in radial overlay
    timeline.to(
      radialRef.current,
      {
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
      },
      ">",
    );

    // Scale the last image after everything else
    timeline.to(imgs[imgs.length - 1], {
      scale: 1.1,
      duration: 1.2,
      ease: "power2.inOut",
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative aspect-video w-[min(88vw,28rem)] overflow-hidden md:w-[42vw]"
      >
        {IMAGES.map((src, i) => (
          <div
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: i, clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
        <div
          ref={radialRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 88% at 50% 42%, transparent 22%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0.82) 100%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default Intro;
