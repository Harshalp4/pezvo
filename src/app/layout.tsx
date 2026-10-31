import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./pezvo.css";
import CallbackProvider from "@/components/CallbackProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PEZVO — Freshness, Delivered. | Premium Laundry & Dry Cleaning", template: "%s | PEZVO" },
  description: site.description, applicationName: "PEZVO", alternates: { canonical: "/" },
  icons: { icon: "/brand/pezvo-icon.webp", apple: "/brand/pezvo-icon.png" },
  openGraph: { type: "website", locale: "en_IN", siteName: "PEZVO", title: "PEZVO — Freshness, Delivered.", description: site.description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PEZVO Premium Laundry & Dry Cleaning" }] },
  twitter: { card: "summary_large_image", title: "PEZVO — Freshness, Delivered.", images: ["/opengraph-image"] },
  robots: { index: !!process.env.NEXT_PUBLIC_SITE_URL, follow: !!process.env.NEXT_PUBLIC_SITE_URL },
};
export const viewport: Viewport = { themeColor: "#073D4B", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "PEZVO", url: site.url, logo: `${site.url}/brand/pezvo-logo.png`, slogan: site.promise };
  return <html lang="en-IN"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <CallbackProvider><Header /><main id="main">{children}</main><Footer /><MobileBar /></CallbackProvider>
  </body></html>;
}
