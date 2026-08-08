"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "motion/react";
import ParallaxImage from "@/components/Parallaximages/Parallaximage";
import "./JourneySection.css";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STEPS = [
  {
    id: "origin",
    year: "2022",
    label: "The Seed",
    title: "A Dream Rooted in Beans",
    body: "It started in a tiny apartment — Javid, a bag of Ethiopian Yirgacheffe, and an obsession with the perfect extraction. Late nights turned into early mornings, and a ritual became a calling.",
    image: "/assets/coffeebeans.jpg",
    tag: "Origin Story",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path
          d="M32 10C21 10 12 19.5 12 32C12 44.5 21 54 32 54C43 54 52 44.5 52 32C52 19.5 43 10 32 10Z"
          strokeWidth="2"
        />
        <path
          d="M32 12C26 20 26 44 32 52"
          strokeWidth="2"
          strokeDasharray="2 3"
        />
        <circle cx="40" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "craft",
    year: "2023",
    label: "The Craft",
    title: "Mastering the Roast",
    body: "After two years of studying artisanal roasting techniques across India and Europe, the signature medium-dark drum roast profile was born — dark chocolate, toasted hazelnut, and a hint of wild berry.",
    image: "/assets/LatteeArt.jpeg",
    tag: "Craft & Learning",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <rect x="16" y="24" width="32" height="28" rx="6" strokeWidth="2" />
        <path
          d="M24 24V16C24 13.8 25.8 12 28 12H36C38.2 12 40 13.8 40 16V24"
          strokeWidth="2"
        />
        <path
          d="M32 30C28 34 28 38 32 42C36 38 36 34 32 30Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    ),
  },
  {
    id: "space",
    year: "2024",
    label: "The Space",
    title: "Finding Our Third Place",
    body: "The first physical home — a sunlit corner of Hyderabad's old quarter. Reclaimed wood counters, copper fixtures, and the perpetual aroma of freshly ground coffee. Community flooded in.",
    image: "/assets/insidecafe2.jpg",
    tag: "Opening",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path
          d="M12 52V28L32 12L52 28V52H38V38H26V52H12Z"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M26 38H38V52" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "brand",
    year: "2025",
    label: "The Brand",
    title: "Javid's Café Goes Digital",
    body: "Now fully launched — with a menu crafted for the senses, a community built on shared mornings, and a digital presence that brings the café experience to every screen. This is just the beginning.",
    image: "/assets/Coffeetime.jpg",
    tag: "Present Day",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path
          d="M14 22H50V36C50 45 42 50 32 50C22 50 14 45 14 36V22Z"
          strokeWidth="2"
        />
        <path
          d="M50 26H56C60 26 60 36 56 38H48"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 16C24 12 28 12 28 8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 16C32 12 36 12 36 8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

// A single journey card that animates in on scroll
function JourneyCard({ step, index, svgPaths, setSvgPaths }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`journey-row ${isEven ? "journey-row--left" : "journey-row--right"}`}
      data-step-id={step.id}
    >
      {/* Connecting dot */}
      <div className="journey-spine-dot">
        <motion.div
          className="journey-spine-dot-inner"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="journey-spine-year"
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {step.year}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className="journey-card"
        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Icon badge */}
        <div className="journey-card__icon-badge">
          <div className="journey-card__icon">{step.icon}</div>
        </div>

        <div className="journey-card__tag">{step.tag}</div>
        <h3 className="journey-card__title">{step.title}</h3>
        <p className="journey-card__body">{step.body}</p>

        {/* Shimmer line */}
        <motion.div
          className="journey-card__line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.div>

      {/* Parallax Image */}
      <motion.div
        className="journey-image-wrap"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="journey-image-inner">
          <ParallaxImage src={step.image} alt={step.title} strength={0.12} />
        </div>
        <div className="journey-image-label">{step.label}</div>
      </motion.div>
    </div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const svgRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [dotPositions, setDotPositions] = useState([]);

  useEffect(() => {
    const updateSpine = () => {
      const section = sectionRef.current;
      if (!section) return;
      const dots = section.querySelectorAll(".journey-spine-dot");
      const sectionRect = section.getBoundingClientRect();
      const positions = Array.from(dots).map((dot) => {
        const r = dot.getBoundingClientRect();
        return r.top - sectionRect.top + r.height / 2;
      });
      setDotPositions(positions);
      setSvgHeight(section.offsetHeight);
    };

    updateSpine();
    window.addEventListener("resize", updateSpine);
    setTimeout(updateSpine, 300);
    return () => window.removeEventListener("resize", updateSpine);
  }, []);

  useEffect(() => {
    if (!spineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-spine-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1.5,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [svgHeight]);

  return (
    <section ref={sectionRef} className="journey-section" id="journey">
      {/* Section Header */}
      <div className="journey-header">
        <motion.span
          className="journey-header__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Journey
        </motion.span>
        <motion.h2
          className="journey-header__title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Four Years of <em>Craft</em>
        </motion.h2>
        <motion.p
          className="journey-header__sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          From a single bag of beans to a beloved café — every step brewed with
          intention.
        </motion.p>
      </div>

      {/* SVG connecting coffee drip spine */}
      <div ref={spineRef} className="journey-spine">
        <svg
          ref={svgRef}
          className="journey-spine-svg"
          width="4"
          height={svgHeight || 1000}
          viewBox={`0 0 4 ${svgHeight || 1000}`}
          preserveAspectRatio="none"
        >
          {/* Background track */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2={svgHeight || 1000}
            stroke="rgba(201,162,39,0.15)"
            strokeWidth="2"
          />
          {/* Animated progress line */}
          <line
            className="journey-spine-progress"
            x1="2"
            y1="0"
            x2="2"
            y2={svgHeight || 1000}
            stroke="url(#spineGrad)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="60%" stopColor="#ff9e2c" />
              <stop offset="100%" stopColor="#e87a30" />
            </linearGradient>
          </defs>
          {/* Drip dots at each step */}
          {dotPositions.map((y, i) => (
            <circle
              key={i}
              cx="2"
              cy={y}
              r="5"
              fill="#c9a227"
              stroke="#120d0a"
              strokeWidth="3"
            />
          ))}
        </svg>
      </div>

      {/* Steps */}
      <div className="journey-steps">
        {JOURNEY_STEPS.map((step, i) => (
          <JourneyCard key={step.id} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
