"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./RoasteryGallery.css";

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return (
      values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue
    );
  };
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler),
      );
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const RoasteryGallery = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  gap = 8,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:640px)",
      "(min-width:420px)",
    ],
    [5, 4, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  // Masonry grid only for desktop
  const grid = useMemo(() => {
    if (!width || isMobile) return items.map((child) => ({ ...child }));
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const aspect = child.height ?? 340;
      const height = (columnWidth / (child.width ?? 300)) * aspect;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width, isMobile]);

  useLayoutEffect(() => {
    if (!imagesReady || isMobile) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };
      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 100, ...(blurToFocus && { filter: "blur(10px)" }) },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, blurToFocus, duration, ease, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`roastery-gallery ${isMobile ? "mobile" : ""}`}
      style={{ "--roastery-gap": `${gap}px` }}
    >
      {grid.map((item) => (
        <div key={item.id} data-key={item.id} className="roastery-item">
          <div
            className="roastery-item__img"
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className="roastery-item__caption">
            {item.title && (
              <span className="roastery-item__title">{item.title}</span>
            )}
            {item.tag && <span className="roastery-item__tag">{item.tag}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoasteryGallery;
