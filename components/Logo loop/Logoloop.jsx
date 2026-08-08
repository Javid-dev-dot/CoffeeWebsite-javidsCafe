"use client";
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import "./LogoLoop.css";

const CONFIG = { MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

/* -------------------------------------------------------------------------- */
/* Coffee-cup mark used in the woven brand badge                              */
/* -------------------------------------------------------------------------- */
const CupMark = () => (
  <svg
    className="logoloop__cup"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 8h13v6.5A4.5 4.5 0 0 1 12.5 19h-4A4.5 4.5 0 0 1 4 14.5V8Z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M17 9.5h1.6a2.4 2.4 0 0 1 0 4.8H17"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M7 5.2c0-.9.9-1.1.9-1.9M10.6 5.2c0-.9.9-1.1.9-1.9"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Measures the sequence + drives a seamless, modulo-wrapped GSAP tween       */
/* -------------------------------------------------------------------------- */
const useGsapMarquee = ({
  trackRef,
  seqRef,
  speed,
  direction,
  isVertical,
  isPaused,
  hoverScale,
}) => {
  const [seqSize, setSeqSize] = useState(0);
  const tweenRef = useRef(null);

  useEffect(() => {
    const seq = seqRef.current;
    if (!seq) return undefined;

    const measure = () => {
      const rect = seq.getBoundingClientRect();
      const size = isVertical ? rect.height : rect.width;
      if (size > 0) setSeqSize(Math.ceil(size));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(seq);
    return () => ro.disconnect();
  }, [seqRef, isVertical]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqSize === 0) return undefined;

    const prop = isVertical ? "y" : "x";
    const forward = direction === "left" || direction === "up";
    const distance = forward ? -seqSize : seqSize;
    const duration = seqSize / Math.max(Math.abs(speed), 1);

    gsap.set(track, { [prop]: 0 });

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(track, {
      [prop]: distance,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        [prop]: gsap.utils.unitize((v) => {
          const n = parseFloat(v) % seqSize;
          return forward ? (n > 0 ? n - seqSize : n) : n < 0 ? n + seqSize : n;
        }),
      },
    });

    return () => tweenRef.current?.kill();
  }, [trackRef, seqSize, speed, direction, isVertical]);

  // Smooth pause / resume via timeScale, plus a gentle "brew slower" on hover
  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    gsap.to(tween, {
      timeScale: isPaused ? 0 : (hoverScale ?? 1),
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
    });
  }, [isPaused, hoverScale]);
};

/* -------------------------------------------------------------------------- */
/* Cursor-following brass spotlight (Framer Motion springs)                   */
/* -------------------------------------------------------------------------- */
const useSpotlight = (containerRef) => {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  const onMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [containerRef, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(-9999);
    y.set(-9999);
  }, [x, y]);

  return { sx, sy, onMove, onLeave };
};

/* -------------------------------------------------------------------------- */

export const LogoLoop = memo(
  ({
    logos,
    speed = 90,
    direction = "left",
    width = "100%",
    logoHeight = 30,
    gap = 40,
    pauseOnHover = true,
    fadeOut = true,
    fadeOutColor,
    scaleOnHover = true,
    brandName = "Javid's Cafe",
    brandEvery = 3,
    renderItem,
    ariaLabel = "Javid's Cafe — partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [copyCount, setCopyCount] = useState(CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);
    const isVertical = direction === "up" || direction === "down";

    const { sx, sy, onMove, onLeave } = useSpotlight(containerRef);

    /* weave the brand badge into the logo sequence every `brandEvery` items */
    const sequence = useMemo(() => {
      if (!brandName || brandEvery <= 0) return logos;
      const out = [];
      logos.forEach((item, i) => {
        out.push(item);
        if ((i + 1) % brandEvery === 0) out.push({ __brand: true });
      });
      return out;
    }, [logos, brandName, brandEvery]);

    const updateCopies = useCallback(() => {
      const containerSize = isVertical
        ? (containerRef.current?.parentElement?.clientHeight ??
          containerRef.current?.clientHeight ??
          0)
        : (containerRef.current?.clientWidth ?? 0);
      const seqRect = seqRef.current?.getBoundingClientRect();
      const seqSize = isVertical
        ? (seqRect?.height ?? 0)
        : (seqRect?.width ?? 0);
      if (seqSize > 0) {
        const needed =
          Math.ceil(containerSize / seqSize) + CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(CONFIG.MIN_COPIES, needed));
      }
    }, [isVertical]);

    useEffect(() => {
      updateCopies();
      const ro = new ResizeObserver(updateCopies);
      if (containerRef.current) ro.observe(containerRef.current);
      window.addEventListener("resize", updateCopies);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", updateCopies);
      };
    }, [updateCopies, sequence, gap, logoHeight]);

    useGsapMarquee({
      trackRef,
      seqRef,
      speed,
      direction,
      isVertical,
      isPaused: pauseOnHover && isHovered,
      hoverScale: 1,
    });

    const handleEnter = useCallback(() => setIsHovered(true), []);
    const handleLeave = useCallback(() => {
      setIsHovered(false);
      onLeave();
    }, [onLeave]);

    const cssVariables = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor],
    );

    const rootClassName = useMemo(
      () =>
        [
          "logoloop",
          isVertical ? "logoloop--vertical" : "logoloop--horizontal",
          fadeOut && "logoloop--fade",
          scaleOnHover && "logoloop--scale-hover",
          className,
        ]
          .filter(Boolean)
          .join(" "),
      [isVertical, fadeOut, scaleOnHover, className],
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === "100%"
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? "100%"),
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical],
    );

    const renderEntry = useCallback(
      (item, key) => {
        if (item.__brand) {
          return (
            <li
              className="logoloop__item logoloop__item--brand"
              key={key}
              role="listitem"
            >
              <span className="logoloop__badge" aria-label={brandName}>
                <CupMark />
                <span className="logoloop__badgeText">{brandName}</span>
              </span>
            </li>
          );
        }

        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }

        const isNodeItem = "node" in item;
        const content = isNodeItem ? (
          <span
            className="logoloop__node"
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <Image
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ""}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? (item.ariaLabel ?? item.title)
          : (item.alt ?? item.title);

        const inner = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <motion.li
            className="logoloop__item"
            key={key}
            role="listitem"
            whileHover={
              scaleOnHover
                ? {
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  }
                : undefined
            }
          >
            {inner}
          </motion.li>
        );
      },
      [renderItem, brandName, scaleOnHover],
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {sequence.map((item, itemIndex) =>
              renderEntry(item, `${copyIndex}-${itemIndex}`),
            )}
          </ul>
        )),
      [copyCount, sequence, renderEntry],
    );

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={onMove}
      >
        <motion.div
          className="logoloop__spotlight"
          style={{ left: sx, top: sy }}
          aria-hidden="true"
        />
        <div className="logoloop__track" ref={trackRef}>
          {logoLists}
        </div>
      </div>
    );
  },
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
