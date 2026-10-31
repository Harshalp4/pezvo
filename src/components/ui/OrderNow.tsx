"use client";

import { useCallbackModal } from "../CallbackProvider";
import { cn } from "@/lib/cn";

type Props = {
  source: string;
  children?: React.ReactNode;
  variant?: "primary" | "outline" | "white";
  className?: string;
};

/**
 * Every conversion click on the site funnels through this one button into the
 * single callback modal. There is no checkout — orders happen in the app.
 */
export default function OrderNow({ source, children = "Book a pickup", variant = "primary", className }: Props) {
  const { open } = useCallbackModal();

  return (
    <button
      type="button"
      onClick={() => open({ source })}
      className={cn(
        "btn-shine inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition",
        variant === "primary" && "bg-blue-700 text-white shadow hover:-translate-y-px hover:bg-blue-600",
        variant === "outline" && "border-[1.5px] border-blue-700 bg-white text-ink hover:bg-blue-50",
        variant === "white" && "bg-white text-blue-700 shadow hover:-translate-y-px hover:bg-blue-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
