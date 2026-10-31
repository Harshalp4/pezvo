"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Focus-trapped dialog. ESC closes, focus returns to the opener, Tab cycles
 * inside, and the page behind is locked from scrolling.
 *
 * `dismissOnBackdrop` defaults to true, which is right for a lightbox — click
 * anywhere to get out, nothing is lost. It must be turned OFF for anything
 * containing a form: a stray click on the dim area silently destroys
 * everything the visitor typed, with no warning and no undo. On the callback
 * form that is a discarded lead.
 */
export default function Modal({
  children,
  onClose,
  labelledBy,
  className = "max-w-[520px]",
  dismissOnBackdrop = true,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  dismissOnBackdrop?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog.
    const focusables = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      restoreTo.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[8000] flex items-center justify-center bg-[rgba(6,42,107,.45)] p-5 backdrop-blur-[4px]"
      onMouseDown={
        dismissOnBackdrop
          ? (e) => {
              if (e.target === e.currentTarget) onClose();
            }
          : undefined
      }
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative max-h-[88vh] w-full overflow-auto rounded-lg bg-white shadow-lg ${className}`}
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 0.7, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface-alt text-ink-muted transition hover:bg-blue-50 hover:text-blue-700"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
