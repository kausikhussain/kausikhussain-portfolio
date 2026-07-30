"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import ProjectCard from "./ui/ProjectCard";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ["All", "AI & Full-Stack", "Full-Stack & Real-Time", "Full-Stack"];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <Section id="projects" withGlow={true}>
      {/* Section Header */}
      <Heading
        badge="FEATURED PRODUCT SHOWCASE"
        badgeIcon={<Layers className="w-3.5 h-3.5" />}
        title="Architected"
        gradientText="Products & Platforms"
        subtitle="SIH 2025 Finalist telemedicine platforms, sub-200ms real-time collaborative meshes, and 3D web systems."
        align="center"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold font-mono transition-all duration-300 cursor-pointer ${
              activeFilter === filter
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/40"
                : "bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white hover:border-white/30"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-full"
          >
            <ProjectCard
              project={project}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
            />
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
