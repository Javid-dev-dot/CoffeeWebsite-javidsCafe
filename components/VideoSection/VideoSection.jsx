"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineSidebar from "./LineSideBar";
import "./VideoSection.css";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Vector SVG Icons for Javid's Cafe Craft Nodes
const CraftSVGNodes = {
  beans: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M32 10C21 10 12 19.5 12 32C12 44.5 21 54 32 54C43 54 52 44.5 52 32C52 19.5 43 10 32 10Z"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 12C26 20 26 44 32 52"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <path
        d="M22 22C26 25 28 30 26 36C24 42 21 45 22 45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="24" r="2.5" fill="currentColor" />
    </svg>
  ),
  roaster: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <rect x="16" y="24" width="32" height="28" rx="6" strokeWidth="2.5" />
      <path
        d="M24 24V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V24"
        strokeWidth="2.5"
      />
      <path
        d="M32 30C28 34 28 38 32 42C36 38 36 34 32 30Z"
        fill="currentColor"
      />
      <path d="M20 12C20 8 26 8 26 4" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 12C44 8 38 8 38 4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  grinder: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M20 12H44L40 28H24L20 12Z"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M32 12V4M32 4H42" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="22" y="28" width="20" height="24" rx="4" strokeWidth="2.5" />
      <circle cx="32" cy="40" r="4" strokeWidth="2.5" />
    </svg>
  ),
  kettle: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M18 24C18 20 22 16 32 16C42 16 46 20 46 24L50 48C50 51 47 54 43 54H21C17 54 14 51 14 48L18 24Z"
        strokeWidth="2.5"
      />
      <path
        d="M46 28C54 28 56 34 50 40"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 30C10 24 8 14 14 10C16 8.5 20 10 22 12"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  pitcher: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <path d="M20 16H44L40 52H24L20 16Z" strokeWidth="2.5" />
      <path
        d="M44 22H52C55 22 56 28 52 36H42"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 28C28 32 30 36 32 38C34 36 36 32 32 28Z"
        fill="currentColor"
      />
    </svg>
  ),
  cup: (
    <svg
      viewBox="0 0 64 64"
      className="craft-node-svg"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M14 22H50V36C50 45 42 50 32 50C22 50 14 45 14 36V22Z"
        strokeWidth="2.5"
      />
      <path
        d="M50 26H56C60 26 60 36 56 38H48"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M10 54H54" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 16C24 12 28 12 28 8" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 16C32 12 36 12 36 8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

// Signature Craft Slide Data
const SLIDES_DATA = [
  {
    id: "slide-1",
    tag: "01 / ATELIER",
    title: "The Genesis of Javid's",
    subtitle: "Artisanal Coffee Atelier & Roastery",
    video: "/assets/Video1.mp4",
    poster: "/assets/LandingCafe.jpg",
    iconKey: "beans",
    category: "Philosophy",
    notes:
      "Where raw single-origin Arabica beans meet relentless passion. Javid's Cafe crafts sensory coffee moments engineered down to the micron.",
    metrics: [
      { label: "Origin", value: "Ethiopian Yirgacheffe" },
      { label: "Elevation", value: "2,150 Meters" },
      { label: "Artisan Score", value: "98.4 / 100" },
    ],
    accent: "#D4AF37",
  },
  {
    id: "slide-2",
    tag: "02 / HARVEST",
    title: "Single-Origin Selection",
    subtitle: "Hand-Picked Sun-Dried Cherry Harvest",
    video: "/assets/coffeebeans.mp4",
    poster: "/assets/coffeebeans.jpg",
    iconKey: "beans",
    category: "Sourcing",
    notes:
      "Only top 1% harvest cherries pass inspection. Slow sun-cured on raised African beds to concentrate floral jasmine, bergamot & sweet peach tones.",
    metrics: [
      { label: "Moisture", value: "11.2% Ideal" },
      { label: "Drying", value: "21 Days Sun" },
      { label: "Flavor", value: "Jasmine & Citrus" },
    ],
    accent: "#FF9E2C",
  },
  {
    id: "slide-3",
    tag: "03 / ROASTING",
    title: "The Golden Roast Alchemist",
    subtitle: "Cast-Iron Drum Maillard Thermal Profile",
    video: "/assets/video2.mp4",
    poster: "/assets/coffeecolors.jpg",
    iconKey: "roaster",
    category: "Thermal Transformation",
    notes:
      "Precision thermal air velocity control. First crack captured at 215°C unlocks caramelization and aromatic lipids without scorched bitterness.",
    metrics: [
      { label: "Target Temp", value: "215°C First Crack" },
      { label: "Batch Size", value: "6kg Micro-Batch" },
      { label: "Profile", value: "City+ Velvet" },
    ],
    accent: "#E87A30",
  },
  {
    id: "slide-4",
    tag: "04 / EXTRACTION",
    title: "Thermal Extraction & Microfoam",
    subtitle: "93.5°C Pure Stream & Silky Milk Craft",
    video: "/assets/hotcoffee.mp4",
    poster: "/assets/LatteeArt.jpeg",
    iconKey: "kettle",
    category: "Barista Science",
    notes:
      "Gooseneck temperature-stabilized flow meets 9-bar pressure curves. Aerated steam infusion creates silky microfoam engineered for contrast art.",
    metrics: [
      { label: "Water Temp", value: "93.5°C Mineral" },
      { label: "Extraction", value: "21.2% Yield" },
      { label: "Crema Density", value: "Silky Velvet" },
    ],
    accent: "#F4C476",
  },
  {
    id: "slide-5",
    tag: "05 / SIGNATURE DRINKS",
    title: "Javid's Brew Collection",
    subtitle: "Curated Artisanal Espresso & Cold Extractions",
    video: "/assets/reelcoffee.mp4",
    poster: "/assets/Coffejavid.png",
    iconKey: "pitcher",
    category: "Menu Atelier",
    notes:
      "Explore Javid's signature coffee list—from concentrated velvet ristretto shots to nitro-infused cold brews finished with Tahitian vanilla bean.",
    drinks: [
      {
        name: "Espresso",
        img: "/assets/Espresso.png",
        note: "Dark chocolate & rich gold crema",
      },
      {
        name: "Cappuccino",
        img: "/assets/Cappuccino.png",
        note: "Silky microfoam & espresso balance",
      },
      {
        name: "Latte",
        img: "/assets/Latte.png",
        note: "Smooth steamed milk & caramel finish",
      },
      {
        name: "Cold Brew",
        img: "/assets/Cold Brew.png",
        note: "24hr cold steeped steep brew",
      },
      {
        name: "Mocha",
        img: "/assets/Mocha.png",
        note: "Belgian dark cocoa & roast espresso",
      },
    ],
    accent: "#E2B15E",
  },
  {
    id: "slide-6",
    tag: "06 / LOUNGE",
    title: "The Night Atmosphere",
    subtitle: "Nocturnal Tasting Room & Jazz Lounge",
    video: "/assets/twincoffee.mp4",
    poster: "/assets/night coffee shop.jpg",
    iconKey: "cup",
    category: "Experience",
    notes:
      "As dusk falls, Javid's transforms into an intimate sensory sanctuary. Live pour-over bar, candlelit lounge, and curated artisan pairings.",
    metrics: [
      { label: "Hours", value: "7 AM - 11 PM" },
      { label: "Atmosphere", value: "Ambient Jazz & Dusk" },
      { label: "Reservations", value: "Tasting Table Open" },
    ],
    accent: "#FFD700",
  },
];

const SIDEBAR_ITEMS = [
  "01 Atelier",
  "02 Harvest",
  "03 Roasting",
  "04 Extraction",
  "05 Menu",
  "06 Lounge",
];

export default function VideoSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeDrink, setActiveDrink] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [svgPaths, setSvgPaths] = useState([]);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  // Calculate dynamic SVG connecting line paths between horizontal slide cards
  const calculateSVGPaths = useCallback(() => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const newPaths = [];

    for (let i = 0; i < SLIDES_DATA.length - 1; i++) {
      const el1 = cardRefs.current[i];
      const el2 = cardRefs.current[i + 1];

      if (el1 && el2) {
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();

        const x1 = r1.left + r1.width / 2 - trackRect.left;
        const y1 = r1.top + r1.height / 2 - trackRect.top;
        const x2 = r2.left + r2.width / 2 - trackRect.left;
        const y2 = r2.top + r2.height / 2 - trackRect.top;

        const dx = x2 - x1;
        const cx1 = x1 + dx * 0.5;
        const cy1 = y1 - 40;
        const cx2 = x1 + dx * 0.5;
        const cy2 = y2 + 40;

        const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
        const isActive = activeSlide === i || activeSlide === i + 1;

        newPaths.push({
          id: `line-${i}`,
          d: pathD,
          isActive,
        });
      }
    }
    setSvgPaths(newPaths);
  }, [activeSlide]);

  // GSAP Horizontal Scroll Pinning
  // Disabled: the section no longer pins on scroll or drags the track
  // horizontally based on scroll position. Slide navigation still works
  // via the Prev/Next buttons, slide pills, and sidebar (see
  // scrollToSlide below), which animate the track directly with gsap.to.
  useGSAP(
    () => {
      // Intentionally left blank — horizontal scroll-jacking disabled.
    },
    { scope: sectionRef },
  );

  useLayoutEffect(() => {
    calculateSVGPaths();
    const handleResize = () => calculateSVGPaths();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateSVGPaths]);

  // Jump to specific slide index smoothly
  const scrollToSlide = (index) => {
    setActiveSlide(index);
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;
    const targetScroll = (index / (SLIDES_DATA.length - 1)) * totalScroll;

    gsap.to(track, {
      x: -targetScroll,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <section className="javids-video-section" ref={sectionRef}>
      {/* Dark Ambient Lighting Backdrop */}
      <div className="ambient-spotlight-top"></div>
      <div className="ambient-spotlight-bottom"></div>

      {/* Brand Navigation Header */}
      <header className="javids-brand-header">
        <div className="brand-logo-area">
          <div className="brand-crown-icon">✦</div>
          <div className="brand-titles">
            <span className="brand-main">JAVID&S CAFE</span>
            <span className="brand-tagline">
              Artisanal Coffee Atelier • Est. 2026
            </span>
          </div>
        </div>

        {/* Quick Slide Navigation Dots */}
        <div className="slide-pills-nav">
          {SLIDES_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              className={`slide-pill-btn ${activeSlide === idx ? "active" : ""}`}
              onClick={() => scrollToSlide(idx)}
            >
              <span className="pill-dot"></span>
              <span className="pill-label">{slide.tag}</span>
            </button>
          ))}
        </div>

        {/* Audio Toggle & Order CTA */}
        <div className="header-actions">
          <button
            className="audio-toggle-btn"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? "🔇 Muted" : "🔊 Sound On"}
          </button>
          <button className="reserve-cta-btn">
            <span>Reserve Table</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </header>

      {/* LineSidebar Sync Overlay */}
      <aside className="javids-sidebar-overlay">
        <LineSidebar
          items={SIDEBAR_ITEMS}
          activeItemIndex={activeSlide}
          onItemClick={(idx) => scrollToSlide(idx)}
          accentColor="#D4AF37"
          textColor="#E6C687"
          markerColor="#8B5A2B"
        />
      </aside>

      {/* Horizontal Track Container */}
      <div className="horizontal-scroll-viewport">
        <div className="horizontal-track" ref={trackRef}>
          {/* SVG Connecting Liquid Path Lines */}
          <svg className="track-svg-canvas" aria-hidden="true">
            <defs>
              <linearGradient
                id="goldLiquidGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF9E2C" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E2B15E" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="dimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
                <stop offset="100%" stopColor="rgba(139, 90, 43, 0.1)" />
              </linearGradient>
              <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {svgPaths.map((p) => (
              <g key={p.id}>
                <path
                  d={p.d}
                  fill="none"
                  stroke={p.isActive ? "url(#goldLiquidGrad)" : "url(#dimGrad)"}
                  strokeWidth={p.isActive ? "3.5" : "2"}
                  strokeDasharray={p.isActive ? "none" : "6 6"}
                  filter={p.isActive ? "url(#svgGlow)" : undefined}
                />
                {p.isActive && (
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#FFF4B8"
                    strokeWidth="4"
                    strokeDasharray="14 140"
                    className="flowing-pulse-particle"
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Slide Cards Loop */}
          {SLIDES_DATA.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <article
                key={slide.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`horizontal-card ${isActive ? "active-card" : ""}`}
                style={{ "--slide-accent": slide.accent }}
              >
                {/* Background Video Stream with Overlay */}
                <div className="card-media-wrapper">
                  <video
                    src={slide.video}
                    poster={slide.poster}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="card-video-bg"
                  />
                  <div className="card-media-gradient"></div>
                </div>

                {/* Node Craft Badge Icon */}
                <div className="card-craft-node">
                  <div className="node-icon-box">
                    {CraftSVGNodes[slide.iconKey]}
                  </div>
                  <span className="node-step-tag">{slide.tag}</span>
                </div>

                {/* Main Card Content Glass Box */}
                <div className="card-glass-content">
                  <div className="card-header">
                    <span className="card-category-badge">
                      {slide.category}
                    </span>
                    <button
                      className="expand-video-btn"
                      onClick={() => setModalVideo(slide.video)}
                      title="Expand Video"
                    >
                      <span>⤢</span> Fullscreen
                    </button>
                  </div>

                  <h2 className="card-title">{slide.title}</h2>
                  <h3 className="card-subtitle">{slide.subtitle}</h3>
                  <p className="card-notes">{slide.notes}</p>

                  {/* Interactive Drink Selector if Slide 5 */}
                  {slide.drinks && (
                    <div className="drinks-showcase">
                      <div className="drink-tabs">
                        {slide.drinks.map((d, dIdx) => (
                          <button
                            key={d.name}
                            className={`drink-tab-btn ${activeDrink === dIdx ? "active" : ""}`}
                            onClick={() => setActiveDrink(dIdx)}
                          >
                            {d.name}
                          </button>
                        ))}
                      </div>
                      <div className="drink-preview-box">
                        <img
                          src={slide.drinks[activeDrink].img}
                          alt={slide.drinks[activeDrink].name}
                          className="drink-img"
                        />
                        <div className="drink-info">
                          <span className="drink-name">
                            {slide.drinks[activeDrink].name}
                          </span>
                          <span className="drink-note">
                            {slide.drinks[activeDrink].note}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Metrics Grid */}
                  {slide.metrics && (
                    <div className="card-metrics-row">
                      {slide.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="metric-pill">
                          <span className="m-label">{m.label}</span>
                          <span className="m-val">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Slide Index Counter */}
                <div className="card-footer-index">
                  <span>0{idx + 1}</span>
                  <span className="index-divider">/</span>
                  <span>0{SLIDES_DATA.length}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Progress & Navigation Bar */}
      <footer className="javids-bottom-bar">
        <div className="slide-counter-badge">
          <span className="counter-current">0{activeSlide + 1}</span>
          <span className="counter-total">/ 0{SLIDES_DATA.length}</span>
          <span className="counter-title">
            {SLIDES_DATA[activeSlide]?.title}
          </span>
        </div>

        {/* Scroll Progress Fill Line */}
        <div className="progress-track-wrapper">
          <div
            className="progress-track-fill"
            style={{
              width: `${((activeSlide + 1) / SLIDES_DATA.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Prev / Next Controls */}
        <div className="track-nav-buttons">
          <button
            className="nav-arrow-btn"
            disabled={activeSlide === 0}
            onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
          >
            ← Prev
          </button>
          <button
            className="nav-arrow-btn"
            disabled={activeSlide === SLIDES_DATA.length - 1}
            onClick={() =>
              scrollToSlide(Math.min(SLIDES_DATA.length - 1, activeSlide + 1))
            }
          >
            Next →
          </button>
        </div>
      </footer>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              className="video-modal-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setModalVideo(null)}
              >
                ✕ Close
              </button>
              <video
                src={modalVideo}
                autoPlay
                controls
                className="modal-video-player"
              />
              <div className="modal-caption">
                <h3>Javid's Cafe HD Video Stream</h3>
                <p>Artisanal Coffee Crafting & Extraction</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
