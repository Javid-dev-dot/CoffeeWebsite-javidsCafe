"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import ParallaxImage from "@/components/Parallaximages/Parallaximage";
import "./OriginHero.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * OriginHero — full-bleed "Our Story" hero for Javid's Café.
 *
 * Signature element: a rotating wax-seal badge with rising steam wisps
 * behind it — the same steam motif reused in RoasteryGallery (hover) and
 * SignatureFooter (cup icon), so the three pieces read as one identity.
 */
export default function OriginHero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollLineRef = useRef(null);
  const steamRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [
            titleRef.current,
            subtitleRef.current,
            badgeRef.current,
            scrollLineRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, rotate: 0, clearProps: "transform" },
        );
        const chars = titleRef.current?.querySelectorAll(".char");
        if (chars) gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      // Title — characters rise into place like steam settling
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(
          chars,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.04,
            delay: 0.3,
          },
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.9 },
      );

      // Badge — wax-seal drop-and-settle
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.7, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        scrollLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 1.4,
          transformOrigin: "top center",
        },
      );

      // Rising steam wisps behind the badge — looping, staggered
      const wisps = steamRef.current
        ? gsap.utils.toArray(".origin-hero__steam-wisp", steamRef.current)
        : [];
      const steamTl = gsap.timeline({ repeat: -1, delay: 0.6 });
      wisps.forEach((wisp, i) => {
        steamTl.fromTo(
          wisp,
          { y: 8, opacity: 0, scaleY: 0.85 },
          {
            y: -30,
            opacity: 0.55,
            scaleY: 1.15,
            duration: 2.8,
            ease: "sine.inOut",
            repeat: 1,
            yoyo: true,
          },
          i * 0.7,
        );
      });

      // Parallax darken on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => steamTl.kill();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Our Story";
  const chars = titleText.split("").map((char, i) => (
    <span key={i} className="char" style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section ref={rootRef} className="origin-hero">
      <div className="origin-hero__bg">
        <ParallaxImage
          src="/assets/Javid_Coffee_About_Us_page_202607250838.jpeg"
          alt="Javid's Café — the roastery and dining room"
          strength={0.15}
          fill
          sizes="100vw"
        />
      </div>

      <div ref={overlayRef} className="origin-hero__overlay" />
      <div className="origin-hero__vignette" />
      <div className="origin-hero__grain" />

      {/* Wax-seal badge with rising steam */}
      <motion.div ref={badgeRef} className="origin-hero__badge">
        <div ref={steamRef} className="origin-hero__steam" aria-hidden="true">
          <svg viewBox="0 0 40 60" className="origin-hero__steam-svg">
            <path
              className="origin-hero__steam-wisp"
              d="M14 50C8 42 20 36 14 26C8 16 20 10 16 2"
              fill="none"
            />
            <path
              className="origin-hero__steam-wisp"
              d="M26 50C22 44 30 38 26 30C22 22 30 16 27 8"
              fill="none"
            />
          </svg>
        </div>
        <svg viewBox="0 0 100 100" className="origin-hero__badge-svg">
          <path
            id="originBadgeCircle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text fontSize="11.5" letterSpacing="3.5">
            <textPath href="#originBadgeCircle">
              EST. 2024 • JAVID&apos;S CAFÉ • SMALL BATCH •{" "}
            </textPath>
          </text>
        </svg>
        <div className="origin-hero__badge-cup">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M4 8h13v6.5A4.5 4.5 0 0 1 12.5 19h-4A4.5 4.5 0 0 1 4 14.5V8Z"
              strokeWidth="1.3"
            />
            <path d="M17 9.5h1.6a2.4 2.4 0 0 1 0 4.8H17" strokeWidth="1.3" />
          </svg>
        </div>
      </motion.div>

      <div className="origin-hero__content">
        <p className="origin-hero__eyebrow">Javid&apos;s Café • Est. 2024</p>
        <h1 ref={titleRef} className="origin-hero__title">
          {chars}
        </h1>
        <p ref={subtitleRef} className="origin-hero__subtitle">
          Brewed with passion. Served with soul. Every cup tells a story of
          <br className="origin-hero__subtitle-break" />
          craftsmanship, community, and the perfect roast.
        </p>

        <div className="origin-hero__scroll">
          <span className="origin-hero__scroll-label">Scroll to explore</span>
          <div className="origin-hero__scroll-track">
            <div ref={scrollLineRef} className="origin-hero__scroll-line" />
          </div>
        </div>
      </div>

      <div className="origin-hero__bottom-fade" />
    </section>
  );
}
