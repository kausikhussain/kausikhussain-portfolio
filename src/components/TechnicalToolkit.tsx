"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

export default function TechnicalToolkit() {
  return (
    <Section id="skills" withGrid={true}>
      <Heading
        badge="02 / TECHNICAL MATRIX"
        badgeIcon={<Wrench className="w-3.5 h-3.5" />}
        title="Technical"
        gradientText="Toolkit"
        subtitle="Specialized stack spanning Artificial Intelligence, Full-Stack Architecture, 3D Web Engineering, and Real-Time Systems."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.toolkitGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="h-full"
          >
            <Card className="h-full" hoverGlow={true}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-mono text-xs text-slate-300 font-bold">
                  {group.iconSymbol}
                </div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <Tag
                    key={i}
                    label={item}
                    variant="mono"
                    size="sm"
                    className="hover:border-white/30 hover:text-white"
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
