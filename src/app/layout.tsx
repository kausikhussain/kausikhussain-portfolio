import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sk Kausik Hussain — AI, Full-Stack & 3D Web Engineer",
  description:
    "Portfolio of Sk Kausik Hussain — Smart India Hackathon 2025 Finalist, Full-Stack Developer, AI/ML Specialist & 3D Web Experience Developer.",
  keywords: [
    "Sk Kausik Hussain",
    "Kausik",
    "Smart India Hackathon 2025 Finalist",
    "JanSehat",
    "TripSync",
    "Victus",
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Developer",
    "Three.js",
    "React Three Fiber",
    "Next.js 14",
    "Node.js",
    "Socket.IO",
    "WebRTC",
  ],
  authors: [{ name: "Sk Kausik Hussain" }],
  openGraph: {
    title: "Sk Kausik Hussain — AI × Full-Stack × 3D Web",
    description: "Creating the Next Generation of Intelligent Web Experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} dark scroll-smooth`}>
      <body className="font-sans antialiased bg-[#030308] text-white selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
