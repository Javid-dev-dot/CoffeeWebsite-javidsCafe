"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import useMagneticMask from "./useMagneticMask";
import "./TextSection.css";

const EASE = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function TextSection() {
  const maskRef = useRef(null);
  const { supportsHover } = useMagneticMask(maskRef, { restSize: 44 });

  return (
    <main className="main">
      <motion.div
        className="mask"
        ref={maskRef}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={line}>
          A visual designer — with skills that haven&apos;t been replaced by A.I
          (yet) — making good shit only if the paycheck is equally good.
        </motion.p>
      </motion.div>

      <motion.div
        className="body"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p>
          I&apos;m a <span>selectively skilled</span> product designer with
          strong focus on producing high quality &amp; impactful digital
          experiences.
        </p>
      </motion.div>

      {!supportsHover && (
        <motion.p
          className="touchCaption"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          A visual designer — making good shit only if the paycheck is equally
          good.
        </motion.p>
      )}
    </main>
  );
}
