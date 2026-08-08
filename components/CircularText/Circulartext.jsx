"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import "./CircularText.css";

/**
 * A rotating circular "stamp" badge for Javid's Caf\u00e9.
 * Text loops continuously around a ring via SVG textPath + GSAP,
 * with a still coffee-bean glyph pinned in the center.
 */
const Circulartext = ({
  text = "JAVID'S CAF\u00c9  \u2022  PREMIUM ROAST  \u2022  EST. 2024  \u2022  ",
  size = 128,
  duration = 14,
  className = "",
}) => {
  const ringRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!ringRef.current) return;
    tweenRef.current = gsap.to(ringRef.current, {
      rotate: 360,
      duration,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    return () => tweenRef.current?.kill();
  }, [duration]);

  const r = size / 2 - 14;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      className={`jc-circular-badge ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => tweenRef.current?.timeScale(3)}
      onMouseLeave={() => tweenRef.current?.timeScale(1)}
    >
      <svg
        ref={ringRef}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        <defs>
          <path
            id="jc-badge-circle"
            d={`M ${size / 2}, ${size / 2} m -${r}, 0 a ${r},${r} 0 1,1 ${
              r * 2
            },0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r + 9}
          className="jc-badge-ring-outline"
        />
        <text className="jc-badge-text" textLength={circumference}>
          <textPath href="#jc-badge-circle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      <div className="jc-badge-center" aria-hidden="true">
        <svg viewBox="0 0 24 24" width={size * 0.28} height={size * 0.28}>
          <path
            d="M12 2c-2.2 2-2.2 3.6 0 5.6c2.2 2 2.2 3.6 0 5.6"
            stroke="#C9A227"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse
            cx="12"
            cy="17.5"
            rx="6.5"
            ry="4.5"
            stroke="#C9A227"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M12 13v9"
            stroke="#C9A227"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Circulartext;
