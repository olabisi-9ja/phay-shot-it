import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import Nav, { ProgressRail } from "@/components/Nav";
import { LightboxProvider } from "@/components/Lightbox";

export const metadata: Metadata = {
  metadataBase: new URL("https://phayshot.it"),
  title: {
    default: "PHAY SHOT IT — I photograph what remains",
    template: "%s — PHAY SHOT IT",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "photography",
    "film photography",
    "Lagos photographer",
    "35mm",
    "portraits",
    "nocturne",
    "documentary photography",
    "Phay Shot It",
  ],
  authors: [{ name: "Phay Shot It" }],
  creator: "Phay Shot It",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phayshot.it",
    siteName: SITE.name,
    title: "PHAY SHOT IT — I photograph what remains",
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "A woman in night rain on a neon-lit Lagos street" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHAY SHOT IT — I photograph what remains",
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon-180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE.name,
      url: "https://phayshot.it",
      description: SITE.description,
    },
    {
      "@type": "Person",
      name: "Phay",
      alternateName: SITE.legalName,
      jobTitle: "Photographer",
      description: "Lagos-born photographer working with film — portraits, places, nocturne and motion.",
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      knowsAbout: ["Film photography", "Portrait photography", "Night photography", "Documentary photography"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-js">
      <body>
        {/* set the js flag before paint so the loader can cover first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.replace("no-js","js")`,
          }}
        />
        <link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/fraunces-latin-full-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">
          Skip to the photographs
        </a>
        <SmoothScroll>
          <Loader />
          <Nav />
          <ProgressRail />
          <LightboxProvider>
            <main id="main">{children}</main>
          </LightboxProvider>
          <Grain />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
