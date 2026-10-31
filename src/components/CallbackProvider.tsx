"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";


/** Lazy — neither modal should cost anything before it is opened. */
const CallbackModal = dynamic(() => import("./CallbackModal"), { ssr: false });


export type CallbackSeed = {
  /** Where the click came from — stored on the Lead row for attribution. */
  source?: string;
  pincode?: string;
  service?: string;
  /** Opens straight into the "we don't reach you yet" copy. */
  outOfArea?: boolean;
};

type Ctx = { open: (seed?: CallbackSeed) => void; close: () => void };

const CallbackContext = createContext<Ctx | null>(null);

export function useCallbackModal() {
  const ctx = useContext(CallbackContext);
  if (!ctx) throw new Error("useCallbackModal must be used inside <CallbackProvider>");
  return ctx;
}

export default function CallbackProvider({ children }: { children: ReactNode }) {
  const [seed, setSeed] = useState<CallbackSeed | null>(null);

  const open = useCallback((s?: CallbackSeed) => {
    // A booking request takes priority over the first-visit promotion.

    setSeed(s ?? {});
  }, []);
  const close = useCallback(() => setSeed(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <CallbackContext.Provider value={value}>
      {children}
      {seed && <CallbackModal seed={seed} onClose={close} />}

    </CallbackContext.Provider>
  );
}
