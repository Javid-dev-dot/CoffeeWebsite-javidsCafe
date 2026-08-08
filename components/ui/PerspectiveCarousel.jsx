"use client";
import * as React from "react";
import { motion, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

// Small local class-name joiner so this file has no dependency on your
// project's utils — drop it in as-is.
const cx = (...parts) => parts.filter(Boolean).join(" ");

const pad2 = (n) => String(n).padStart(2, "0");

/**
 * PerspectiveCarousel — simple, premium, infinite-loop image carousel.
 *
 * - Always loops: Previous/Next wrap around forever, no disabled states.
 * - Fully fluid: slide size scales continuously with the viewport via
 *   CSS clamp() — no breakpoint tables, works at any screen size.
 * - Smooth: Motion drives the spring-based slide/drag motion, GSAP drives
 *   two small, cheap flourishes (entrance fade, title underline).
 *
 * Usage:
 *   <PerspectiveCarousel items={items} autoPlay />
 *   // item shape: { src, alt?, title, eyebrow? }
 */
export default function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  autoPlay = false,
  autoPlayInterval = 4500,
  pauseOnHover = true,
  draggable = true,
  showControls = true,
  showDots = true,
  showCounter = true,
  accentColor,
  surfaceColor,
  className,
}) {
  const count = items.length;
  const [uncontrolled, setUncontrolled] = React.useState(
    defaultActiveIndex % Math.max(count, 1),
  );
  const currentIndex =
    (((activeIndex ?? uncontrolled) % count) + count) % count;

  const rootRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const slideRef = React.useRef(null); // used only to measure real slide width
  const ruleRef = React.useRef(null);

  const [slideWidth, setSlideWidth] = React.useState(220);
  const dragX = useMotionValue(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(!autoPlay);

  // Measure the actual rendered slide width (set by CSS clamp()) so the
  // track can be positioned in real pixels — this is what makes it
  // correctly responsive at literally any viewport size, with no
  // breakpoint list to maintain.
  React.useEffect(() => {
    const el = slideRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setSlideWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = React.useCallback(
    (index) => {
      if (!count) return;
      const resolved = ((index % count) + count) % count; // always wraps
      if (activeIndex === undefined) setUncontrolled(resolved);
      onActiveIndexChange?.(resolved);
    },
    [activeIndex, count, onActiveIndexChange],
  );

  // Entrance fade, once on mount.
  React.useEffect(() => {
    if (!trackRef.current) return;
    gsap.from(trackRef.current.querySelectorAll("[data-slide]"), {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.06,
    });
  }, []);

  // Title underline reveal, on every slide change.
  React.useEffect(() => {
    if (!ruleRef.current) return;
    gsap.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.out",
        transformOrigin: "left center",
      },
    );
  }, [currentIndex]);

  // Autoplay — always advances forward and wraps forever.
  React.useEffect(() => {
    if (!autoPlay || isPaused || isDragging || count < 2) return;
    const id = setInterval(() => goTo(currentIndex + 1), autoPlayInterval);
    return () => clearInterval(id);
  }, [
    autoPlay,
    isPaused,
    isDragging,
    currentIndex,
    autoPlayInterval,
    count,
    goTo,
  ]);

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const threshold = slideWidth * 0.25;
    if (info.offset.x < -threshold || info.velocity.x < -500)
      goTo(currentIndex + 1);
    else if (info.offset.x > threshold || info.velocity.x > 500)
      goTo(currentIndex - 1);
    gsap.to(dragX, {
      value: 0,
      duration: 0.4,
      ease: "power3.out",
      onUpdate: () => dragX.set(dragX.get()),
    });
  };

  if (!count) return null;

  const themeStyle = {
    ...(accentColor ? { "--pc-accent": accentColor } : {}),
    ...(surfaceColor ? { "--pc-surface": surfaceColor } : {}),
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
      style={themeStyle}
      className={cx(
        "perspective-carousel relative h-full w-full overflow-hidden",
        className,
      )}
      onMouseEnter={() => pauseOnHover && autoPlay && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && autoPlay && setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(currentIndex - 1);
        if (e.key === "ArrowRight") goTo(currentIndex + 1);
      }}
    >
      <div
        aria-hidden
        className="pc-glow pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />

      {showCounter && count > 1 && (
        <div className="pc-counter pointer-events-none absolute right-4 top-4 z-10 text-xs tracking-widest">
          <strong>{pad2(currentIndex + 1)}</strong> / {pad2(count)}
        </div>
      )}

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          ref={trackRef}
          className="absolute left-1/2 top-1/2 flex w-fit -translate-y-1/2 cursor-grab items-center active:cursor-grabbing"
          style={{ x: dragX }}
          animate={
            isDragging
              ? undefined
              : { x: -(currentIndex * slideWidth + slideWidth / 2) }
          }
          transition={{ type: "spring", bounce: 0.16, duration: 0.7 }}
          drag={draggable ? "x" : false}
          dragElastic={0.12}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = Math.min(
              Math.abs(currentIndex - index),
              count - Math.abs(currentIndex - index), // shortest wrap-around distance
            );

            return (
              <div
                key={`${item.src}-${index}`}
                data-slide
                ref={index === 0 ? slideRef : undefined}
                className="pc-slide shrink-0"
              >
                <motion.div
                  className="relative flex w-full flex-col items-center gap-3"
                  animate={{
                    scale: isActive ? 1 : 0.82,
                    opacity: distance > 3 ? 0 : isActive ? 1 : 0.55,
                  }}
                  transition={{ type: "spring", bounce: 0.16, duration: 0.7 }}
                >
                  <button
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className="pc-card group relative aspect-3/4 w-full cursor-pointer overflow-hidden rounded-2xl"
                    onClick={() => goTo(index)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt ?? item.title}
                      draggable={false}
                      className={cx(
                        "h-full w-full select-none object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.03]",
                        !isActive && "brightness-[0.6] saturate-[0.85]",
                      )}
                    />
                    <div
                      aria-hidden
                      className={cx(
                        "pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/40 transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>

                  <div className="flex w-full max-w-[85%] flex-col items-center gap-1.5 text-center">
                    {item.eyebrow && (
                      <span
                        className="pc-eyebrow text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300"
                        style={{ opacity: isActive ? 1 : 0 }}
                      >
                        {item.eyebrow}
                      </span>
                    )}
                    <p
                      className="pc-title whitespace-nowrap text-sm font-medium transition-[opacity,filter] duration-300"
                      style={{
                        opacity: isActive ? 1 : 0,
                        filter: isActive ? "blur(0px)" : "blur(2px)",
                      }}
                    >
                      {item.title}
                    </p>
                    {isActive && <div ref={ruleRef} className="pc-rule w-8" />}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pc-edge-fade-left pointer-events-none absolute inset-y-0 left-0 w-[clamp(2rem,6vw,4.5rem)]"
      />
      <div
        aria-hidden
        className="pc-edge-fade-right pointer-events-none absolute inset-y-0 right-0 w-[clamp(2rem,6vw,4.5rem)]"
      />

      {showControls && (
        <div className="absolute inset-x-4 bottom-5 z-10 mx-auto flex w-fit items-center justify-center">
          <div className="pc-controls flex items-center gap-3 rounded-full px-2 py-1.5">
            <button
              type="button"
              aria-label="Previous slide"
              className="pc-btn"
              onClick={() => goTo(currentIndex - 1)}
            >
              <ChevronLeft className="size-5" />
            </button>

            {showDots && (
              <div className="flex items-center gap-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : undefined}
                    className={cx(
                      "pc-dot",
                      currentIndex === index ? "pc-dot-active" : "",
                    )}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              aria-label="Next slide"
              className="pc-btn"
              onClick={() => goTo(currentIndex + 1)}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
