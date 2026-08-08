"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AboutReviews.css";

const REVIEWS = [
  {
    id: 1,
    name: "Aisha Kapoor",
    role: "Food Blogger",
    rating: 5,
    text: "The cappuccino at Javid's hit differently — velvety microfoam, perfect crema, and a warmth that lingered long after the last sip. This isn't just coffee, it's an experience.",
    avatar: "AK",
    verified: true,
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Software Engineer",
    rating: 5,
    text: "My morning ritual has changed completely since discovering Javid's. The Ethiopian pour-over is unlike anything else in the city — complex, clean, and utterly addictive.",
    avatar: "RM",
    verified: true,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Interior Designer",
    rating: 5,
    text: "Beyond the coffee, the space itself is beautifully crafted. Warm light, reclaimed wood, copper fixtures — it feels like someone actually cared when designing every corner.",
    avatar: "PN",
    verified: true,
  },
  {
    id: 4,
    name: "Sameer Khan",
    role: "Architect",
    rating: 5,
    text: "The cold brew is the best I've had in India. Smooth, not bitter, with a subtle chocolate finish. I've tried them all — this one stays with you.",
    avatar: "SK",
    verified: true,
  },
  {
    id: 5,
    name: "Leila Osman",
    role: "Marketing Lead",
    rating: 5,
    text: "I ordered the latte art on a whim and it arrived looking like it was painted by hand. The taste matched the beauty — caramel, silk, perfection.",
    avatar: "LO",
    verified: true,
  },
  {
    id: 6,
    name: "Vikram Joshi",
    role: "Photographer",
    rating: 5,
    text: "I've been coming here every week for six months. The consistency alone sets Javid's apart. Every cup is identical perfection — that's artisanship.",
    avatar: "VJ",
    verified: true,
  },
];

function StarIcon({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#c9a227" : "none"}
      stroke={filled ? "#c9a227" : "rgba(201,162,39,0.3)"}
      strokeWidth="1.5"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ReviewCard({ review, isActive }) {
  return (
    <motion.div
      className={`review-card ${isActive ? "review-card--active" : ""}`}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top quote */}
      <div className="review-card__quote-icon" aria-hidden>
        <svg viewBox="0 0 40 30" fill="none">
          <path
            d="M0 18C0 8 6 2 18 0v4C10 5.5 7 10 7 18H14V30H0V18ZM22 18C22 8 28 2 40 0v4C32 5.5 29 10 29 18H36V30H22V18Z"
            fill="rgba(201,162,39,0.2)"
          />
        </svg>
      </div>

      {/* Rating */}
      <div className="review-card__stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>

      {/* Text */}
      <p className="review-card__text">{review.text}</p>

      {/* Author */}
      <div className="review-card__author">
        <div className="review-card__avatar">{review.avatar}</div>
        <div className="review-card__author-info">
          <span className="review-card__name">
            {review.name}
            {review.verified && (
              <span className="review-card__verified" title="Verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a227">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#c9a227" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </span>
          <span className="review-card__role">{review.role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const prevReview = () =>
    setActiveIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const nextReview = () =>
    setActiveIndex((i) => (i + 1) % REVIEWS.length);

  // Group reviews to show 3 at a time on desktop
  const visibleIndices = [
    activeIndex % REVIEWS.length,
    (activeIndex + 1) % REVIEWS.length,
    (activeIndex + 2) % REVIEWS.length,
  ];

  return (
    <section className="about-reviews" id="reviews">
      {/* Background decoration */}
      <div className="about-reviews__bg-decor" aria-hidden>
        <svg viewBox="0 0 800 600" fill="none">
          <circle cx="400" cy="300" r="280" stroke="rgba(201,162,39,0.04)" strokeWidth="1" />
          <circle cx="400" cy="300" r="220" stroke="rgba(201,162,39,0.06)" strokeWidth="1" />
          <circle cx="400" cy="300" r="160" stroke="rgba(201,162,39,0.04)" strokeWidth="1" />
        </svg>
      </div>

      {/* Header */}
      <div className="about-reviews__header">
        <motion.span
          className="about-reviews__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What They Say
        </motion.span>
        <motion.h2
          className="about-reviews__title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Guest <em>Voices</em>
        </motion.h2>
        <motion.p
          className="about-reviews__sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Real words from real regulars who found their third place with us.
        </motion.p>

        {/* Rating summary */}
        <motion.div
          className="about-reviews__rating-summary"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="about-reviews__rating-value">5.0</span>
          <div className="about-reviews__rating-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled />
            ))}
          </div>
          <span className="about-reviews__rating-count">
            Based on 500+ reviews
          </span>
        </motion.div>
      </div>

      {/* Cards */}
      <div ref={containerRef} className="about-reviews__cards">
        <AnimatePresence mode="popLayout">
          {visibleIndices.map((idx, i) => (
            <ReviewCard
              key={`${idx}-${i}`}
              review={REVIEWS[idx]}
              isActive={i === 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <motion.div
        className="about-reviews__nav"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          onClick={prevReview}
          className="about-reviews__nav-btn"
          aria-label="Previous review"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="about-reviews__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`about-reviews__dot ${i === activeIndex ? "active" : ""}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextReview}
          className="about-reviews__nav-btn"
          aria-label="Next review"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
