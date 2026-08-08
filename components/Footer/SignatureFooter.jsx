"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./SignatureFooter.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   HAND-DRAWN SOCIAL ICONS
   ========================================================================== */
const SocialIcons = {
  instagram: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <rect x="7" y="7" width="34" height="34" rx="11" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="9" strokeWidth="2.5" />
      <circle cx="33.5" cy="14.5" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <path
        d="M10 10L38 38M38 10L10 38"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <path
        d="M28 42V25h6l1-8h-7v-5c0-2.3 1-4 4.2-4H35V1.3C34 1.2 31.6 1 28.9 1 23 1 19 4.6 19 11.2V17h-6v8h6v17h9Z"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor">
      <circle cx="24" cy="24" r="17" strokeWidth="2.5" />
      <path
        d="M19 40c1.5-5 3.4-12.2 4.6-17 1-4 6.8-4.6 9-1.4 1.7 2.5 1 7.4-1.7 9.6-2.5 2-5.9.6-6.4-2.2-.4-2.2 1-5.6 1-7.7 0-3.4-4.6-3.7-5.9-.6-1 2.4-.3 4 .4 5.2"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* Footer Data */
const EXPLORE_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Signature Menu", href: "#menu" },
  { label: "Roastery Tours", href: "#roastery" },
  { label: "Reserve a Table", href: "#reserve" },
  { label: "Careers", href: "#careers" },
];

const HOURS = [
  { day: "Mon – Fri", time: "7:00 AM – 11:00 PM" },
  { day: "Sat – Sun", time: "8:00 AM – 12:00 AM" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "X", href: "https://x.com", icon: "x" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
];

export default function SignatureFooter() {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [year] = useState(() => new Date().getFullYear());

  useGSAP(
    () => {
      if (!footerRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const columns = gsap.utils.toArray(".footer-col", footerRef.current);

      if (prefersReduced) {
        gsap.set(columns, { y: 0, opacity: 1 });
      } else {
        gsap.set(columns, { y: 36, opacity: 0 });
        var st = ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(columns, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
            });
          },
        });
      }

      let steamTl;
      if (!prefersReduced) {
        const wisps = gsap.utils.toArray(".steam-wisp", footerRef.current);
        steamTl = gsap.timeline({ repeat: -1 });
        wisps.forEach((wisp, i) => {
          steamTl.fromTo(
            wisp,
            { y: 6, opacity: 0, scaleY: 0.85 },
            {
              y: -22,
              opacity: 0.85,
              scaleY: 1.1,
              duration: 2.6,
              ease: "sine.inOut",
              repeat: 1,
              yoyo: true,
            },
            i * 0.6,
          );
        });
      }

      return () => {
        st?.kill();
        steamTl?.kill();
      };
    },
    { scope: footerRef },
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="javids-footer" ref={footerRef}>
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="footer-top">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand-row">
            <span className="footer-crown" aria-hidden="true">
              ✦
            </span>
            <div>
              <h2 className="footer-brand-name">JAVID&apos;S CAFÉ</h2>
              <p className="footer-brand-tag">
                Artisanal Coffee Atelier • Est. 2024
              </p>
            </div>
          </div>

          <svg
            className="footer-cup-signature"
            viewBox="0 0 160 90"
            aria-hidden="true"
          >
            <path
              className="steam-wisp"
              d="M58 46C52 38 64 32 58 22"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              className="steam-wisp"
              d="M72 46C68 40 78 34 74 26"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M40 46h50v14a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V46Z"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
            />
            <path
              d="M90 50h8a10 10 0 0 1 0 20h-8"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
            />
          </svg>

          <p className="footer-about-text">
            A small-batch roastery and neighborhood table — where every pour is
            measured, and every seat is welcome.
          </p>

          <div className="footer-social-row">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label={social.name}
                whileHover={{ y: -4, scale: 1.08, rotate: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 340, damping: 14 }}
              >
                {SocialIcons[social.icon]}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Explore Links */}
        <nav className="footer-col footer-links-col" aria-label="Explore">
          <h3 className="footer-col-title">Explore</h3>
          <ul className="footer-link-list">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit / Hours */}
        <div className="footer-col footer-visit-col">
          <h3 className="footer-col-title">Visit Us</h3>
          <address className="footer-address">
            14 Roastery Lane
            <br />
            Old Town Quarter
            <br />
            Vijayawada, AP 520001
          </address>
          <ul className="footer-hours">
            {HOURS.map((h) => (
              <li key={h.day}>
                <span className="hours-day">{h.day}</span>
                <span className="hours-time">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col footer-newsletter-col">
          <h3 className="footer-col-title">Brew Notes</h3>
          <p className="footer-newsletter-copy">
            Seasonal roasts, new menu drops, and tasting invites — no more than
            once a month.
          </p>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-newsletter-input"
              aria-label="Email address"
            />
            <motion.button
              type="submit"
              className="footer-newsletter-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
          <AnimatePresence>
            {subscribed && (
              <motion.p
                className="footer-subscribed-note"
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                ✓ You&apos;re on the list. See you at the counter.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="footer-divider" aria-hidden="true" />

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {year} Javid&apos;s Café. All rights reserved.
        </p>
        <ul className="footer-legal-links">
          <li>
            <a href="#privacy">Privacy</a>
          </li>
          <li>
            <a href="#terms">Terms</a>
          </li>
          <li>
            <a href="#accessibility">Accessibility</a>
          </li>
        </ul>
        <motion.button
          className="footer-to-top-btn"
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Back to top"
        >
          ↑ Top
        </motion.button>
      </div>
    </footer>
  );
}
