"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const CupIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="jc-nav-brand-icon"
  >
    <path
      d="M10 18h24l-2.4 18.2a4 4 0 0 1-4 3.4H16.4a4 4 0 0 1-4-3.4L10 18Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M34 21h3.5A4.5 4.5 0 0 1 42 25.5v0A4.5 4.5 0 0 1 37.5 30H33.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M17 8c-1.2 1.6-1.2 2.9 0 4.5M24 8c-1.2 1.6-1.2 2.9 0 4.5M31 8c-1.2 1.6-1.2 2.9 0 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const handleResize = () => {
      if (window.innerWidth > 640) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="jc-navbar">
      <div className={`jc-navbar-inner ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="jc-nav-brand">
          <CupIcon />
          <span className="jc-nav-brand-text">Javid&apos;s Caf&eacute;</span>
        </Link>

        <div className="jc-desktop-nav">
          {NAV_LINKS.slice(1).map((link) => (
            <React.Fragment key={link.href}>
              <span className="jc-nav-divider" />
              <Link href={link.href} className="jc-nav-link">
                {link.label}
              </Link>
            </React.Fragment>
          ))}
          <span className="jc-nav-divider" />
          <Link href="/#reserve" className="jc-nav-cta">
            Reserve Table
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="jc-mobile-toggle"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
          <motion.span
            animate={
              open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.15 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="jc-mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="jc-nav-link"
                style={{ display: "block", padding: "0.75rem 1rem" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#reserve"
              onClick={() => setOpen(false)}
              className="jc-nav-cta"
              style={{
                display: "inline-flex",
                marginTop: "0.5rem",
                alignSelf: "flex-start",
              }}
            >
              Reserve Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
