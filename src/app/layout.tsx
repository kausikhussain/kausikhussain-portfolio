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
  authors: [{ name: "Sk Kausik Hussain" }],
  openGraph: {
    title: "Sk Kausik Hussain — Engineer, Explorer, Builder",
    description:
      "Full-stack engineer building AI-powered platforms, real-time systems, and interactive 3D experiences.",
    type: "website",
  },
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
        {/* Blocking script: apply saved theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("kh-theme");document.documentElement.setAttribute("data-theme",t==="studio"?"studio":"afterhours")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
