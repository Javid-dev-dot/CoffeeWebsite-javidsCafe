"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const CupMark = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 18h24l-2.4 18.2a4 4 0 0 1-4 3.4H16.4a4 4 0 0 1-4-3.4L10 18Z"
      stroke="#C9A227"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M34 21h3.5A4.5 4.5 0 0 1 42 25.5v0A4.5 4.5 0 0 1 37.5 30H33.2"
      stroke="#C9A227"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 8c-1.2 1.6-1.2 2.9 0 4.5M24 8c-1.2 1.6-1.2 2.9 0 4.5M31 8c-1.2 1.6-1.2 2.9 0 4.5"
      stroke="#C9A227"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4">
      <div
        className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8
        w-full max-w-md sm:w-auto
        bg-[#120D0A]/70 backdrop-blur-md border border-[#C9A227]/25
        rounded-full px-5 sm:px-7 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <CupMark />
          <span
            className="text-sm sm:text-base font-semibold tracking-[0.08em] text-[#F3E9D8]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Javid&apos;s Caf&eacute;
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.slice(1).map((link, i) => (
            <span key={link.href} className="flex items-center gap-6">
              <span className="w-px h-4 bg-[#C9A227]/30" />
              <Link
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-[#F3E9D8]/85 hover:text-[#C9A227] transition-colors duration-300"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden relative w-6 h-5 shrink-0"
        >
          <motion.span
            className="absolute left-0 top-0 w-6 h-[1.5px] bg-[#F3E9D8] origin-center"
            animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[1.5px] bg-[#F3E9D8]"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="absolute left-0 bottom-0 w-6 h-[1.5px] bg-[#F3E9D8] origin-center"
            animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="sm:hidden absolute top-18 w-[calc(100%-2rem)] max-w-md
            bg-[#120D0A]/90 backdrop-blur-md border border-[#C9A227]/25 rounded-2xl
            px-6 py-4 flex flex-col gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium tracking-wide text-[#F3E9D8]/90 hover:text-[#C9A227] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
