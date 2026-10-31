"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The three signature tagline motifs from the design system (§5).
 * Each is reused elsewhere so the motion system reads as intentional:
 *   RouteDraw    → also the process progress line
 *   ShineSweep   → also primary-button hover (.btn-shine in globals.css)
 *   VerifiedSeal → also callback success + welcome celebration
 *
 * All are whileInView / once, so they play when scrolled to rather than on load.
 */

const VIEWPORT = { once: true, amount: 0.6 } as const;

/* ── 01 · Convenience — a route drawing door → home ───────────────────────── */
export function RouteDraw({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 150 60" fill="none" className={className} aria-hidden="true" width="150" height="60">
      <motion.path
        d="M12 46 C40 46 46 14 76 14 C106 14 112 46 138 46"
        stroke="#073D4B"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : 1.4, ease: "easeOut" }}
      />
      <circle cx="12" cy="46" r="4" fill="#073D4B" />
      <motion.circle
        cx="138"
        cy="46"
        r="5"
        fill="#147B80"
        initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1.3, ease: "backOut" }}
        style={{ transformOrigin: "138px 46px" }}
      />
    </svg>
  );
}

/* ── 02 · Cleanliness — a light band sweeping a freshly pressed lapel ─────── */
export function ShineSweep({ text = "Fresh", className = "" }: { text?: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-block overflow-hidden font-display text-[2rem] font-extrabold text-blue-700 ${className}`}>
      {text}
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 25%, rgba(255,255,255,.9) 50%, transparent 75%)",
          }}
          initial={{ x: "-120%" }}
          whileInView={{ x: "220%" }}
          viewport={VIEWPORT}
          transition={{ duration: 1.3, delay: 0.25, ease: "easeOut" }}
        />
      )}
    </span>
  );
}

/* ── 03 · Confidence — a circle drawing around a green tick, then stamping ── */
export function VerifiedSeal({ size = 64, className = "" }: { size?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      initial={reduce ? { scale: 1 } : { scale: 1.05 }}
      whileInView={{ scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.9, ease: "backOut" }}
    >
      <motion.circle
        cx="32"
        cy="32"
        r="27"
        stroke="#147B80"
        strokeWidth="2.5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
      />
      <motion.path
        d="M20 33l8.5 8.5L45 25"
        stroke="#147B80"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.75, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
