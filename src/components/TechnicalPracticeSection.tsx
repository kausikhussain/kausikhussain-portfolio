"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Server, BrainCircuit, Database } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const DISCIPLINES = [
  {
    title: "Languages & Core Foundations",
    icon: Code2,
    context: "Type-safe architectures, object-oriented systems, and algorithmic efficiency.",
    skills: ["Python", "TypeScript", "Java", "C / C++", "JavaScript (ES6+)", "SQL"],
  },
  {
    title: "Frontend & Spatial Interfaces",
    icon: Monitor,
    context: "Fluid 60 FPS interfaces, responsive design systems, and GPU-accelerated WebGL.",
    skills: ["React 19", "Next.js 16 (App Router)", "Three.js / R3F", "Tailwind CSS v4", "Framer Motion", "HTML5 & Modern CSS"],
  },
  {
    title: "Real-Time & Backend Systems",
    icon: Server,
    context: "Low-latency WebSocket event meshes, peer-to-peer media streaming, and secure APIs.",
    skills: ["Node.js", "Express.js", "Spring Boot", "Socket.IO", "WebRTC", "RESTful APIs", "JWT Auth"],
  },
  {
    title: "AI, ML & Intelligent Pipelines",
    icon: BrainCircuit,
    context: "Applied NLP classification, medical symptom analysis, and vector retrieval pipelines.",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "LangChain", "RAG Architectures", "Pandas & NumPy", "OpenCV"],
  },
  {
    title: "Data Systems & Infrastructure",
    icon: Database,
    context: "Document and relational schemas, distributed caching, and automated deployment.",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Docker", "Git & GitHub CI", "Linux", "Vercel", "Postman"],
  },
];

export default function TechnicalPracticeSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 chip mb-4">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--c-blue)" }} />
            <span>03 / TECHNICAL PRACTICE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
            Stack & capabilities.
          </h2>
          <p className="text-sub text-base sm:text-lg mt-3">
            Practical competencies applied across production projects, national hackathons, and research explorations.
          </p>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISCIPLINES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease, delay: idx * 0.07 }}
                className={`rounded-2xl p-6 sm:p-7 card-base flex flex-col justify-between ${
                  idx === 0 || idx === 1 ? "md:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2.5 rounded-xl border border-faint text-link"
                      style={{ backgroundColor: "var(--c-surface-raised)" }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-display font-bold text-heading">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-sub leading-relaxed mb-6">
                    {item.context}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-faint">
                  {item.skills.map((skill) => (
                    <span key={skill} className="chip text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
