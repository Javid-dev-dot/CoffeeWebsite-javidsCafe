"use client";

import { useState, useEffect } from "react";

export default function CoffeeCounter() {
  const [count, setCount] = useState(0);
  const stats = [
    { value: "5,742", label: "Happy Customers" },
    { value: "28", label: "Coffee Origins" },
  ];

  useEffect(() => {
    const target = 15000;
    const duration = 3000;
    const startTime = Date.now() - (1 - 0.85) * duration;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCount(Math.floor(target * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-16 py-12 border-y border-[#d4af37]/10">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-bold text-[#d4af37] mb-2">
          {count.toLocaleString()}+
        </div>
        <div className="text-[#a39482] uppercase tracking-widest text-sm">
          Cups Served
        </div>
      </div>

      {stats.map((stat) => (
        <div className="text-center" key={stat.label}>
          <div className="text-4xl sm:text-5xl font-bold text-[#d4af37] mb-2">
            {stat.value}
          </div>
          <div className="text-[#a39482] uppercase tracking-widest text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
