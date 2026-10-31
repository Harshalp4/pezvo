"use client";

import { attributedAppleUrl, attributedPlayUrl, readCampaign } from "@/lib/attribution";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Disabled until the deployment explicitly sets this public measurement ID.
const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const enabled = !!measurementId && /^G-[A-Z0-9]+$/.test(measurementId);

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWebsiteEvent(name: "generate_lead" | "contact_click" | "app_store_click", params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (name === "generate_lead") window.fbq?.("track", "Lead", { content_name: params.service });
  if (!enabled) return;
  window.gtag?.("event", name, params);
}

export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);
  useEffect(() => {
    // Decorate rendered links too, so open-in-new-tab retains the campaign.
    const decorate = () => {
      const campaign = readCampaign();
      document.querySelectorAll<HTMLAnchorElement>('a[href^="https://play.google.com/"]').forEach(link => {
        const next = attributedPlayUrl(link.href, campaign);
        if (next !== link.href) link.href = next;
      });
      document.querySelectorAll<HTMLAnchorElement>('a[href^="https://apps.apple.com/"]').forEach(link => {
        const next = attributedAppleUrl(link.href, campaign, process.env.NEXT_PUBLIC_APPLE_PROVIDER_TOKEN || "");
        if (next !== link.href) link.href = next;
      });
    };
    decorate();
    const observer = new MutationObserver(decorate);
    observer.observe(document.body, { childList: true, subtree: true });
    const onStoreClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      const store = url.hostname === "play.google.com" ? "android" : url.hostname === "apps.apple.com" ? "ios" : null;
      if (store) trackWebsiteEvent("app_store_click", { store, page_path: pathname });
    };
    document.addEventListener("click", onStoreClick);
    return () => { observer.disconnect(); document.removeEventListener("click", onStoreClick); };
  }, [pathname]);
  useEffect(() => {
    readCampaign();
    if (!enabled) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
    if (!lastPage.current) window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: window.location.origin + pathname,
      page_referrer: "",
    });
    if (lastPage.current !== pathname) {
      lastPage.current = pathname;
      window.gtag("event", "page_view", { page_location: window.location.origin + pathname, page_title: document.title });
      if (pathname === "/services" || pathname.startsWith("/services/")) {
        window.gtag("event", "service_view", { service_path: pathname });
      }
    }
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const channel = href.startsWith("tel:") ? "phone" : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href) ? "whatsapp" : null;
      // Never send telephone numbers, message text, full URLs or form values.
      if (channel) trackWebsiteEvent("contact_click", { channel, page_path: pathname });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [pathname]);
  return enabled ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" /> : null;
}
