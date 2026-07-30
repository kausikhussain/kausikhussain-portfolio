"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import TimelineCard from "./ui/TimelineCard";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

export default function ExperienceSection() {
  return (
    <Section id="experience" withGrid={true}>
      {/* Section 1: Academic Background */}
      <div className="mb-20">
        <Heading
          badge="EDUCATION & ACADEMICS"
          badgeIcon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Academic"
          gradientText="Background"
          subtitle="Silicon Institute of Technology — B.Tech Computer Science & Engineering (CGPA 8.75)"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400 block mb-2">
                    {edu.period}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">{edu.school}</p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-4">
                    <span>{edu.grade}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-4 border-t border-white/10 leading-relaxed">
                  ✨ {edu.highlight}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 2: Credentials & Achievements */}
      <div>
        <Heading
          badge="HONORS & CREDENTIALS"
          badgeIcon={<Trophy className="w-3.5 h-3.5" />}
          title="Credentials &"
          gradientText="Achievements"
          subtitle="Smart India Hackathon (SIH) 2025 National Finalist & IIT Bhubaneswar Hackathon innovations."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PORTFOLIO_DATA.experiences.map((exp) => (
            <TimelineCard
              key={exp.id}
              title={exp.role}
              subtitle={exp.company}
              period={exp.period}
              badge={exp.duration}
              bullets={exp.bullets}
              tags={exp.tags}
              icon={<Award className="w-5 h-5" />}
            />
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PORTFOLIO_DATA.certifications.map((cert, i) => (
            <Card key={i} className="p-5 flex items-center justify-between" hoverGlow={false}>
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">{cert.name}</h4>
                <p className="text-[11px] font-mono text-slate-400">{cert.issuer} • {cert.date}</p>
              </div>
              <Award className="w-5 h-5 text-indigo-400 shrink-0" />
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
