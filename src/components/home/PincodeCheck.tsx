"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { checkPincode } from "@/lib/api";
import type { ZoneCheck } from "@/lib/types";
import { useCallbackModal } from "../CallbackProvider";

/**
 * Address-first CTA. Serviceable → open the callback modal pre-filled.
 * Not serviceable → a friendly "leave your number" state, not a dead end.
 */
export default function PincodeCheck({
  variant = "hero",
  source = "hero-pincode",
}: {
  variant?: "hero" | "panel";
  source?: string;
}) {
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ZoneCheck | null>(null);
  const { open } = useCallbackModal();
  const reduce = useReducedMotion();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setResult(null);
    const r = await checkPincode(pin);
    setResult(r);
    setBusy(false);
    if (r.serviceable) {
      open({ source, pincode: pin, service: undefined });
    }
  }

  return (
    <div className={variant === "panel" ? "" : "max-w-[520px]"}>
      {/* Stacks on phones: side by side, the input squeezes below a usable width. */}
      <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:flex-row">
        <label className="sr-only" htmlFor={`pin-${variant}`}>
          Your 6-digit pincode
        </label>
        <input
          id={`pin-${variant}`}
          inputMode="numeric"
          maxLength={6}
          autoComplete="postal-code"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult(null);
          }}
          placeholder="Enter your pincode"
          className="min-h-[52px] w-full min-w-0 flex-1 rounded-sm border border-line bg-white px-3.5 py-3 font-mono text-[0.9375rem] outline-none transition focus:border-blue-400 focus:ring-[3px] focus:ring-blue-50"
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-shine shrink-0 rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white shadow transition hover:-translate-y-px hover:bg-blue-600 disabled:opacity-60"
        >
          {busy ? "Checking…" : variant === "hero" ? "Check & book" : "Check"}
        </button>
      </form>

      <AnimatePresence>
        {result && !result.serviceable && (
          <motion.div
            role="status"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="mt-4 rounded-sm border border-blue-100 bg-blue-50 px-4 py-3.5 text-[0.9375rem] text-blue-800"
          >
            {result.message}{" "}
            <button
              type="button"
              onClick={() => open({ source: `${source}:out-of-area`, pincode: pin, outOfArea: false })}
              className="font-semibold underline underline-offset-2"
            >
              Leave your number →
            </button>
          </motion.div>
        )}
        {result?.serviceable && (
          <motion.p
            role="status"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-sm border border-green-100 bg-green-50 px-4 py-3.5 text-[0.9375rem] text-green-800"
          >
            {result.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
