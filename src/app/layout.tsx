import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kausikhussain.vercel.app"),
  title: "Sk Kausik Hussain — Engineer, Explorer, Builder",
  description:
    "Full-stack engineer building AI-powered platforms, real-time collaborative systems, and interactive 3D web experiences. Smart India Hackathon 2025 Finalist.",
  keywords: [
    "Sk Kausik Hussain",
    "Full Stack Developer",
    "AI Engineer",
    "Smart India Hackathon",
    "SIH 2025",
    "Three.js",
    "Next.js",
    "React",
    "WebRTC",
    "Socket.IO",
  ],
  authors: [{ name: "Sk Kausik Hussain", url: "https://github.com/kausikhussain" }],
  creator: "Sk Kausik Hussain",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sk Kausik Hussain — Engineer, Explorer, Builder",
    description:
      "Full-stack engineer building AI-powered platforms, real-time systems, and interactive 3D experiences.",
    url: "https://kausikhussain.vercel.app",
    siteName: "Sk Kausik Hussain Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sk Kausik Hussain — Engineer, Explorer, Builder",
    description:
      "Full-stack engineer building AI platforms, real-time sync meshes, and interactive 3D web experiences.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sk Kausik Hussain",
  alternateName: "Kausik Hussain",
  url: "https://kausikhussain.vercel.app",
  jobTitle: "Software Engineer & AI Developer",
  description:
    "Full-stack engineer building AI-powered platforms, real-time collaborative systems, and interactive 3D web experiences.",
  sameAs: [
    "https://github.com/kausikhussain",
    "https://linkedin.com/in/kausikhussain",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Web Development",
    "Three.js & WebGL",
    "React & Next.js",
    "WebRTC & Low-Bandwidth Streaming",
    "Socket.IO Real-Time Meshes",
  ],
  award: "Smart India Hackathon 2025 National Finalist",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        {/* Blocking script: apply saved theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("kh-persona")||localStorage.getItem("kh-theme");var m=(t==="creative"||t==="engineering")?t:"ai";document.documentElement.setAttribute("data-theme",m);document.documentElement.setAttribute("data-identity-mode",m);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
