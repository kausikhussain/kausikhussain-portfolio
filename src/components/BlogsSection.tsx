"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

export default function BlogsSection() {
  return (
    <Section id="blogs" withGrid={true}>
      <Heading
        badge="05.2 / WRITING & THOUGHTS"
        badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
        title="Thoughts &"
        gradientText="Tutorials"
        subtitle="Technical write-ups on SIH 2025 AI architectures, 3D WebGL optimization, and real-time Socket.IO systems."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.blogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="h-full"
          >
            <Card className="flex flex-col justify-between h-full" hoverGlow={true}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Tag label="COMING SOON" variant="glow" size="sm" />
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {blog.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                {blog.tags.map((tag, i) => (
                  <Tag key={i} label={tag} variant="mono" size="sm" />
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
