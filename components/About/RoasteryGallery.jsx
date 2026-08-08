"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./RoasteryGallery.css";

/**
 * RoasteryGallery — animated masonry grid for Javid's Café photos.
 *
 * Signature interaction: each photo sits desaturated ("aged print") until
 * hovered, when it blooms into full color and a caption rises with a
 * small steam glyph — the same rising-steam motif used in OriginHero and
 * SignatureFooter.
 */

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
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

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

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
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (item) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    gsap.to(`${selector} .roastery-item__img`, {
      filter: "saturate(1) brightness(1)",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(`${selector} .roastery-item__caption`, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.fromTo(
      `${selector} .roastery-item__steam path`,
      { y: 6, opacity: 0 },
      {
        y: -16,
        opacity: 0.85,
        duration: 1.1,
        ease: "sine.out",
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
      },
    );
  };

  const handleMouseLeave = (item) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, { scale: 1, duration: 0.35, ease: "power2.out" });
    }
    gsap.to(`${selector} .roastery-item__img`, {
      filter: "saturate(0.15) brightness(0.85)",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(`${selector} .roastery-item__caption`, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.killTweensOf(`${selector} .roastery-item__steam path`);
    gsap.set(`${selector} .roastery-item__steam path`, { opacity: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="roastery-gallery"
      style={{ "--roastery-gap": `${gap}px` }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="roastery-item"
          role="button"
          tabIndex={0}
          aria-label={item.title ? `View ${item.title}` : "View photo"}
          onClick={() =>
            item.url && window.open(item.url, "_blank", "noopener")
          }
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={() => handleMouseLeave(item)}
          onFocus={() => handleMouseEnter(item)}
          onBlur={() => handleMouseLeave(item)}
        >
          <div
            className="roastery-item__img"
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className="roastery-item__vignette" />

          <div className="roastery-item__steam" aria-hidden="true">
            <svg viewBox="0 0 30 40" width="20" height="28">
              <path d="M8 34C4 28 12 24 8 16C4 8 12 4 10 -2" fill="none" />
              <path d="M18 34C15 29 21 25 18 18C15 11 21 6 19 0" fill="none" />
            </svg>
          </div>

          {(item.title || item.tag) && (
            <div className="roastery-item__caption">
              {item.title && (
                <span className="roastery-item__title">{item.title}</span>
              )}
              {item.tag && (
                <span className="roastery-item__tag">{item.tag}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoasteryGallery;
