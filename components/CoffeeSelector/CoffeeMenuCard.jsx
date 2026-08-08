"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Flame,
  Droplet,
  Award,
  Coffee as CoffeeIcon,
  ChevronRight,
  X,
  Sliders,
  CheckCircle2,
  Info,
  Layers,
  Thermometer,
  Zap,
} from "lucide-react";
import "./CoffeeMenuCard3D.css";

// Register ScrollTrigger safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Extended Reserve Data — Curated Specialty Coffees
// ---------------------------------------------------------------------------
const coffeeOptions = [
  {
    id: "espresso",
    name: "Espresso",
    category: "espresso",
    img: "/assets/Espresso.png",
    accent: "#c98a4b",
    secondaryAccent: "#e6ad65",
    origin: "Yirgacheffe, Ethiopia",
    elevation: "2,150 m",
    process: "Natural / Sun-Dried",
    cuppingScore: "92.5",
    roast: "Light-Medium",
    price: "₹150",
    details:
      "A dense, syrupy extraction — dark cocoa and ripe stone fruit up front with a lingering floral finish.",
    tip: "Best enjoyed within 90 seconds of the pull, while the crema holds its silky golden structure.",
    tags: ["Dark Cocoa", "Stone Fruit", "Jasmine"],
    specs: {
      intensity: 9,
      acidity: 8,
      sweetness: 6,
      body: 9,
      grind: "Ultra Fine",
      temp: "93°C",
      ratio: "1:2",
      extractionTime: "28s",
    },
  },
  {
    id: "latte",
    name: "Latte",
    category: "milk",
    img: "/assets/Latte.png",
    accent: "#d8b177",
    secondaryAccent: "#f4d090",
    origin: "Huila, Colombia",
    elevation: "1,850 m",
    process: "Washed Process",
    cuppingScore: "89.0",
    roast: "Medium",
    price: "₹200",
    details:
      "Single-origin espresso folded into velvety steamed microfoam, rounded and quietly sweet.",
    tip: "Ask for a single dust of single-origin cinnamon or raw vanilla bean — no extra syrups required.",
    tags: ["Brown Sugar", "Vanilla", "Silky Milk"],
    specs: {
      intensity: 5,
      acidity: 4,
      sweetness: 8,
      body: 7,
      grind: "Medium Fine",
      temp: "65°C Milk",
      ratio: "1:4",
      extractionTime: "25s",
    },
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "milk",
    img: "/assets/Cappuccino.png",
    accent: "#c8843c",
    secondaryAccent: "#ea9d4a",
    origin: "Minas Gerais, Brazil",
    elevation: "1,200 m",
    process: "Pulped Natural",
    cuppingScore: "90.0",
    roast: "Medium",
    price: "₹220",
    details:
      "Equal golden thirds: concentrated espresso shot, rich steamed milk, and a cushion of cloud microfoam.",
    tip: "First sip should pierce through the dry foam dome straight into the hot espresso underneath.",
    tags: ["Hazelnut", "Toasted Oat", "Creamy Foam"],
    specs: {
      intensity: 7,
      acidity: 5,
      sweetness: 7,
      body: 8,
      grind: "Fine",
      temp: "66°C Milk",
      ratio: "1:3",
      extractionTime: "26s",
    },
  },
  {
    id: "mocha",
    name: "Mocha",
    category: "milk",
    img: "/assets/Mocha.png",
    accent: "#8a5a3c",
    secondaryAccent: "#b57a54",
    origin: "Sumatra, Indonesia",
    elevation: "1,500 m",
    process: "Wet-Hulled (Giling Basah)",
    cuppingScore: "88.5",
    roast: "Dark",
    price: "₹250",
    details:
      "70% single-origin dark chocolate melt meets intense espresso, balanced with warm microfoam.",
    tip: "Pairs impeccably with an almond biscotti or a pinch of flaked sea salt over the foam cap.",
    tags: ["70% Dark Cacao", "Earthy Spice", "Bittersweet"],
    specs: {
      intensity: 8,
      acidity: 3,
      sweetness: 9,
      body: 9,
      grind: "Medium-Fine",
      temp: "68°C Milk",
      ratio: "1:5",
      extractionTime: "27s",
    },
  },
  {
    id: "americano",
    name: "Americano",
    category: "espresso",
    img: "/assets/Americano.png",
    accent: "#6b4a34",
    secondaryAccent: "#996b4c",
    origin: "Antigua, Guatemala",
    elevation: "1,700 m",
    process: "Washed / Volcanic Soil",
    cuppingScore: "91.0",
    roast: "Medium-Dark",
    price: "₹180",
    details:
      "Double espresso stretched over 92°C filtered water — unmatched clarity and subtle chocolate note.",
    tip: "A slower, cleaner way to taste the intricate terroir without milk masking the subtle notes.",
    tags: ["Spiced Plum", "Smoky Caramel", "Clean Finish"],
    specs: {
      intensity: 7,
      acidity: 7,
      sweetness: 5,
      body: 6,
      grind: "Fine",
      temp: "92°C Water",
      ratio: "1:6",
      extractionTime: "30s",
    },
  },
  {
    id: "macchiato",
    name: "Macchiato",
    category: "espresso",
    img: "/assets/Macchiato.png",
    accent: "#dba066",
    secondaryAccent: "#f2bd86",
    origin: "Nariño, Colombia",
    elevation: "2,000 m",
    process: "Washed / High Altitude",
    cuppingScore: "93.0",
    roast: "Light",
    price: "₹210",
    details:
      "Direct espresso 'stained' only with a dollop of milk velvet. Unapologetically bold and fragrant.",
    tip: "The barista's choice for an afternoon reset — bold espresso punch softened just a touch.",
    tags: ["Citrus Blossom", "Toffee", "Velvet Dollop"],
    specs: {
      intensity: 9,
      acidity: 9,
      sweetness: 5,
      body: 8,
      grind: "Ultra Fine",
      temp: "93°C",
      ratio: "1:1.5",
      extractionTime: "27s",
    },
  },
  {
    id: "flatwhite",
    name: "Flat White",
    category: "milk",
    img: "/assets/FlatWhite .png",
    accent: "#e0b978",
    secondaryAccent: "#f3d59e",
    origin: "Kiambu, Kenya",
    elevation: "1,900 m",
    process: "Double Washed",
    cuppingScore: "92.0",
    roast: "Medium",
    price: "₹230",
    details:
      "Double ristretto shots under a super-thin layer of gloss microfoam for maximum espresso kick.",
    tip: "Served at a drinking temp of 60°C so sweetness is immediately perceptible on first touch.",
    tags: ["Blackcurrant", "Butterscotch", "Micro-Velvet"],
    specs: {
      intensity: 8,
      acidity: 7,
      sweetness: 7,
      body: 8,
      grind: "Fine",
      temp: "60°C Milk",
      ratio: "1:3",
      extractionTime: "22s",
    },
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    category: "cold",
    img: "/assets/Cold Brew.png",
    accent: "#5b7a72",
    secondaryAccent: "#84aba1",
    origin: "Toraja, Indonesia",
    elevation: "1,600 m",
    process: "18-Hour Slow Cold Immersion",
    cuppingScore: "90.5",
    roast: "Dark, cold-steeped",
    price: "₹240",
    details:
      "Steeped slowly in ice-filtered water for 18 hours — ultra low acidity, syrupy body, naturally sweet.",
    tip: "Try it neat over a single crystal ice cube before deciding on any dairy add-in.",
    tags: ["Dark Honey", "Molasses", "Low Acid"],
    specs: {
      intensity: 6,
      acidity: 2,
      sweetness: 9,
      body: 10,
      grind: "Coarse",
      temp: "4°C Cold",
      ratio: "1:8",
      extractionTime: "18 hrs",
    },
  },
];

const categories = [
  { id: "all", label: "All House Specials" },
  { id: "espresso", label: "Espresso Bar" },
  { id: "milk", label: "Velvet Milk Crafts" },
  { id: "cold", label: "Cold & Steeped" },
];

export default function CoffeeMenuCard() {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Customization state inside extraction modal
  const [milkChoice, setMilkChoice] = useState("Oat Milk");
  const [sweetnessLevel, setSweetnessLevel] = useState("50%");
  const [temperature, setTemperature] = useState("Standard");

  const selected = coffeeOptions[index];

  // Ref hooks for GSAP animations
  const sectionRef = useRef(null);
  const pedestalRef = useRef(null);
  const cardContainerRef = useRef(null);
  const sealRef = useRef(null);
  const ringRef = useRef(null);
  const dustRef = useRef(null);
  const menuListRef = useRef(null);
  const steamRef = useRef(null);

  // Filtered options based on tab
  const filteredOptions = useMemo(() => {
    if (activeTab === "all") return coffeeOptions;
    return coffeeOptions.filter((c) => c.category === activeTab);
  }, [activeTab]);

  // Handle active selection change safely when filter changes
  useEffect(() => {
    if (!filteredOptions.some((item) => item.id === selected.id)) {
      const newIndex = coffeeOptions.findIndex(
        (item) => item.id === filteredOptions[0]?.id,
      );
      if (newIndex !== -1) setIndex(newIndex);
    }
  }, [activeTab, filteredOptions, selected.id]);

  // ---------------------------------------------------------------------------
  // GSAP 1: Entrance Timeline & ScrollTrigger
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".reserve-eyebrow, .reserve-title, .reserve-subtitle, .reserve-tabs",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Pedestal & Menu list entrance
      gsap.fromTo(
        pedestalRef.current,
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      if (menuListRef.current) {
        const rows = menuListRef.current.querySelectorAll(".menu-row");
        gsap.fromTo(
          rows,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: menuListRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---------------------------------------------------------------------------
  // GSAP 2: Continuous Seal Rotation
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!ringRef.current) return;
    const rotationTween = gsap.to(ringRef.current, {
      rotate: 360,
      duration: 30,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    return () => rotationTween.kill();
  }, []);

  // ---------------------------------------------------------------------------
  // GSAP 3: Seal Stamp Impact on Index Change
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!sealRef.current) return;
    gsap.fromTo(
      sealRef.current,
      { scale: 1.45, opacity: 0, rotate: -15 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.5)",
      },
    );
  }, [index]);

  // ---------------------------------------------------------------------------
  // GSAP 4: Floating Gold Motes / Dust Particle Physics
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = dustRef.current;
    if (!container) return;
    container.innerHTML = "";
    const particleTweens = [];

    const particleCount = 14;
    for (let i = 0; i < particleCount; i++) {
      const mote = document.createElement("span");
      mote.className = "gold-mote";
      const startX = 10 + Math.random() * 80;
      mote.style.left = `${startX}%`;
      mote.style.bottom = `${Math.random() * 15}%`;
      mote.style.background = selected.secondaryAccent;
      container.appendChild(mote);

      const tween = gsap.fromTo(
        mote,
        { y: 0, x: 0, opacity: 0, scale: 0.4 },
        {
          y: -(140 + Math.random() * 120),
          x: (Math.random() - 0.5) * 80,
          opacity: 0,
          scale: 1.2,
          duration: 4 + Math.random() * 3,
          delay: Math.random() * 2.5,
          ease: "power1.out",
          repeat: -1,
          onStart: () => gsap.set(mote, { opacity: 0.85 }),
        },
      );
      particleTweens.push(tween);
    }

    return () => {
      particleTweens.forEach((t) => t.kill());
    };
  }, [index, selected.secondaryAccent]);

  // ---------------------------------------------------------------------------
  // GSAP 5: 3D Interactive Card Tilt on Mouse Move
  // ---------------------------------------------------------------------------
  const handleMouseMove = useCallback((e) => {
    if (!cardContainerRef.current) return;
    const card = cardContainerRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });

    // Update sheen gradient positioning
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardContainerRef.current) return;
    gsap.to(cardContainerRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  }, []);

  const ringLabel = useMemo(
    () => "SPECIALTY ROASTERS RESERVE • CRAFTED EST. 2026 • ",
    [],
  );

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section className="reserve-section" ref={sectionRef}>
      {/* Background Atmosphere */}
      <div className="reserve-noise" aria-hidden="true" />
      <div
        className="reserve-ambient-glow"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${selected.accent}25 0%, transparent 70%)`,
        }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="reserve-toast"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <CheckCircle2 className="toast-icon" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="reserve-header">
        <div className="eyebrow-container">
          <Sparkles className="eyebrow-sparkle" />
          <span className="reserve-eyebrow">The Reserve Collection</span>
          <Sparkles className="eyebrow-sparkle" />
        </div>

        <h1 className="reserve-title">Artisanal Coffee Selector</h1>
        <p className="reserve-subtitle">
          Select from our master roaster's single-origin harvests & precision
          pulls
        </p>

        <div className="reserve-rule">
          <span className="rule-diamond" />
        </div>

        {/* Category Tabs */}
        <nav className="reserve-tabs" aria-label="Coffee categories">
          {categories.map((cat) => {
            const isTabActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`tab-btn ${isTabActive ? "active" : ""}`}
              >
                {isTabActive && (
                  <motion.span
                    layoutId="active-tab-pill"
                    className="tab-active-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="tab-label">{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Showcase Body */}
      <div className="reserve-body">
        {/* ---------------- Pedestal / Interactive 3D Showcase (Left) ---------------- */}
        <div
          className="pedestal-wrapper"
          ref={pedestalRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pedestal-card" ref={cardContainerRef}>
            <div className="pedestal-sheen" />

            {/* Dynamic Ambient Backlight Glow */}
            <div
              className="pedestal-glow"
              style={{
                background: `radial-gradient(circle at 50% 45%, ${selected.accent}66 0%, ${selected.secondaryAccent}15 50%, transparent 75%)`,
              }}
            />

            {/* Particle Canvas Layer */}
            <div className="gold-dust" ref={dustRef} />

            {/* Top Seal Stamp */}
            <div className="seal" ref={sealRef}>
              <svg viewBox="0 0 200 200" className="seal-ring" ref={ringRef}>
                <defs>
                  <path
                    id="ringPath"
                    d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                  />
                </defs>
                <text className="ring-text">
                  <textPath href="#ringPath" startOffset="0%">
                    {ringLabel.repeat(2)}
                  </textPath>
                </text>
              </svg>
              <div
                className="seal-core"
                style={{
                  borderColor: selected.accent,
                  boxShadow: `0 0 15px ${selected.accent}44, inset 0 0 10px rgba(0,0,0,0.8)`,
                }}
              >
                <Award
                  className="laurel-icon"
                  style={{ color: selected.secondaryAccent }}
                />
                <span className="seal-no">
                  NO. {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Coffee Glass Image Showcase with Framer Motion */}
            <div className="coffee-image-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.img}
                  className="cup-container"
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    filter: "blur(6px)",
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Subtle Vapor / Steam Ray FX */}
                  <div className="steam-container" ref={steamRef}>
                    <div className="steam-ray steam-1" />
                    <div className="steam-ray steam-2" />
                    <div className="steam-ray steam-3" />
                  </div>

                  <img
                    src={selected.img}
                    alt={selected.name}
                    className="coffee-image"
                  />

                  {/* Pedestal Base Drop Shadow & Ring */}
                  <div
                    className="cup-shadow"
                    style={{
                      background: `radial-gradient(ellipse at center, ${selected.accent}88 0%, rgba(0,0,0,0.8) 70%)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tasting Card & Flavor Radar */}
            <div className="tasting-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Category & Origin Badge */}
                  <div className="origin-badge-row">
                    <span
                      className="origin-pill"
                      style={{
                        borderColor: `${selected.accent}55`,
                        color: selected.secondaryAccent,
                      }}
                    >
                      {selected.origin}
                    </span>
                    <span className="cupping-badge">
                      <Award className="badge-icon" /> {selected.cuppingScore}{" "}
                      PTS
                    </span>
                  </div>

                  <h2 className="coffee-name">{selected.name}</h2>

                  <div className="specs-meta-line">
                    <span>{selected.roast} Roast</span>
                    <span className="dot-sep">•</span>
                    <span>Elev. {selected.elevation}</span>
                    <span className="dot-sep">•</span>
                    <span>{selected.process}</span>
                  </div>

                  <p className="coffee-description">{selected.details}</p>

                  {/* Flavor Tags */}
                  <div className="flavor-tags">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="flavor-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Flavor Profile Gauges */}
                  <div className="flavor-gauges">
                    <h4 className="gauges-title">Sensory Profile</h4>

                    <div className="gauge-grid">
                      <div className="gauge-item">
                        <div className="gauge-header">
                          <span className="gauge-label">
                            <Flame className="gauge-icon" /> Intensity
                          </span>
                          <span className="gauge-value">
                            {selected.specs.intensity}/10
                          </span>
                        </div>
                        <div className="gauge-track">
                          <motion.div
                            className="gauge-fill"
                            style={{ background: selected.accent }}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${selected.specs.intensity * 10}%`,
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className="gauge-item">
                        <div className="gauge-header">
                          <span className="gauge-label">
                            <Zap className="gauge-icon" /> Acidity
                          </span>
                          <span className="gauge-value">
                            {selected.specs.acidity}/10
                          </span>
                        </div>
                        <div className="gauge-track">
                          <motion.div
                            className="gauge-fill"
                            style={{ background: selected.secondaryAccent }}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${selected.specs.acidity * 10}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: 0.05,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>

                      <div className="gauge-item">
                        <div className="gauge-header">
                          <span className="gauge-label">
                            <Droplet className="gauge-icon" /> Sweetness
                          </span>
                          <span className="gauge-value">
                            {selected.specs.sweetness}/10
                          </span>
                        </div>
                        <div className="gauge-track">
                          <motion.div
                            className="gauge-fill"
                            style={{ background: selected.accent }}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${selected.specs.sweetness * 10}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>

                      <div className="gauge-item">
                        <div className="gauge-header">
                          <span className="gauge-label">
                            <Layers className="gauge-icon" /> Mouthfeel Body
                          </span>
                          <span className="gauge-value">
                            {selected.specs.body}/10
                          </span>
                        </div>
                        <div className="gauge-track">
                          <motion.div
                            className="gauge-fill"
                            style={{ background: selected.secondaryAccent }}
                            initial={{ width: 0 }}
                            animate={{ width: `${selected.specs.body * 10}%` }}
                            transition={{
                              duration: 0.6,
                              delay: 0.15,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Barista Tip & Action Buttons */}
                  <div className="tasting-footer">
                    <p className="coffee-tip">
                      <span className="tip-mark">BARISTA NOTE</span>{" "}
                      {selected.tip}
                    </p>

                    <div className="action-button-row">
                      <button
                        className="btn-reserve-primary"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${selected.accent}, ${selected.secondaryAccent})`,
                        }}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Sliders className="btn-icon" />
                        <span>Craft Your Extraction</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---------------- Menu Selection List (Right) ---------------- */}
        <nav
          className="menu-list"
          ref={menuListRef}
          aria-label="Coffee menu list"
        >
          <div className="menu-list-header">
            <span className="menu-list-title">
              Selection Menu ({filteredOptions.length})
            </span>
            <span className="menu-list-hint">
              Click item to inspect terroir
            </span>
          </div>

          <div className="menu-rows-wrapper">
            {filteredOptions.map((coffee) => {
              const originalIndex = coffeeOptions.findIndex(
                (c) => c.id === coffee.id,
              );
              const isActive = originalIndex === index;

              return (
                <button
                  key={coffee.id}
                  className={`menu-row ${isActive ? "active" : ""}`}
                  onClick={() => setIndex(originalIndex)}
                  aria-current={isActive}
                >
                  {/* Framer Motion Active Indicator Bar */}
                  {isActive && (
                    <motion.span
                      layoutId="active-bar"
                      className="active-bar"
                      style={{ background: coffee.accent }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="row-index">
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>

                  <div className="row-title-group">
                    <span className="row-name">{coffee.name}</span>
                    <span className="row-subtext">
                      {coffee.origin.split(",")[0]} • {coffee.roast}
                    </span>
                  </div>

                  <span className="row-leader" aria-hidden="true" />

                  <div className="row-price-group">
                    <span className="row-price">{coffee.price}</span>
                    <ChevronRight
                      className={`row-arrow ${isActive ? "active" : ""}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Reserve Direct Callout */}
          <div className="menu-footer-card">
            <div className="footer-card-content">
              <CoffeeIcon className="footer-card-icon" />
              <div>
                <h5>Fresh Single-Origin Batches</h5>
                <p>
                  Roasted every Tuesday in small 5kg batches for maximum
                  aromatics.
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ---------------- Interactive Extraction Modal ---------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X />
              </button>

              <div className="modal-header">
                <span className="modal-eyebrow">Extraction Parameters</span>
                <h3 className="modal-title">{selected.name} Reserve Pull</h3>
                <p className="modal-origin">
                  {selected.origin} ({selected.cuppingScore} PTS)
                </p>
              </div>

              {/* Extraction Specs Grid */}
              <div className="modal-specs-grid">
                <div className="spec-card">
                  <Thermometer className="spec-icon" />
                  <span className="spec-label">Water Temp</span>
                  <span className="spec-value">{selected.specs.temp}</span>
                </div>
                <div className="spec-card">
                  <Sliders className="spec-icon" />
                  <span className="spec-label">Grind Size</span>
                  <span className="spec-value">{selected.specs.grind}</span>
                </div>
                <div className="spec-card">
                  <Info className="spec-label-icon" />
                  <span className="spec-label">Brew Ratio</span>
                  <span className="spec-value">{selected.specs.ratio}</span>
                </div>
                <div className="spec-card">
                  <Zap className="spec-icon" />
                  <span className="spec-label">Extraction Time</span>
                  <span className="spec-value">
                    {selected.specs.extractionTime}
                  </span>
                </div>
              </div>

              {/* Interactive Customizations */}
              <div className="modal-options-section">
                {selected.category === "milk" && (
                  <div className="option-group">
                    <label className="option-label">Milk / Dairy Base</label>
                    <div className="option-buttons">
                      {[
                        "Oat Milk",
                        "Almond Milk",
                        "Whole Milk",
                        "Macadamia",
                      ].map((m) => (
                        <button
                          key={m}
                          className={`option-btn ${milkChoice === m ? "selected" : ""}`}
                          onClick={() => setMilkChoice(m)}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="option-group">
                  <label className="option-label">Sweetness Preference</label>
                  <div className="option-buttons">
                    {[
                      "Unsweetened (0%)",
                      "Light (25%)",
                      "Balanced (50%)",
                      "Sweet (100%)",
                    ].map((s) => (
                      <button
                        key={s}
                        className={`option-btn ${sweetnessLevel === s ? "selected" : ""}`}
                        onClick={() => setSweetnessLevel(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">Serving Temperature</label>
                  <div className="option-buttons">
                    {["Classic Hot", "Chilled Over Ice", "Extra Hot"].map(
                      (t) => (
                        <button
                          key={t}
                          className={`option-btn ${temperature === t ? "selected" : ""}`}
                          onClick={() => setTemperature(t)}
                        >
                          {t}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="modal-footer">
                <div className="price-display">
                  <span className="price-label">Total Price</span>
                  <span className="price-val">{selected.price}</span>
                </div>

                <button
                  className="btn-modal-confirm"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${selected.accent}, ${selected.secondaryAccent})`,
                  }}
                  onClick={() => {
                    setIsModalOpen(false);
                    triggerToast(
                      `Order confirmed for ${selected.name} (${temperature}, ${sweetnessLevel})!`,
                    );
                  }}
                >
                  Confirm & Reserve Shot
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
