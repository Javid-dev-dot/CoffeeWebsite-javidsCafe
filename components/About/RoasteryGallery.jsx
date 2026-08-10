"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./RoasteryGallery.css";

const RoasteryGallery = ({ items }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate items on mount
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Hover effect
      document.querySelectorAll(".gallery-item").forEach((el) => {
        const img = el.querySelector(".gallery-img");
        const caption = el.querySelector(".gallery-caption");

        el.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
          gsap.to(caption, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.inOut" });
          gsap.to(caption, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="gallery">
      {items.map((item) => (
        <div key={item.id} className="gallery-item">
          <div
            className="gallery-img"
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className="gallery-caption">
            {item.title && <span className="gallery-title">{item.title}</span>}
            {item.tag && <span className="gallery-tag">{item.tag}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoasteryGallery;
