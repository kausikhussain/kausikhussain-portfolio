"use client";

import React from "react";
import { ArrowUpRight, ExternalLink, Award, Sparkles } from "lucide-react";
import Card from "./Card";
import Tag from "./Tag";
import Button from "./Button";
import { Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/SocialIcons";

export interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  const isSIH = project.id === "jansehat";

  return (
    <Card className="flex flex-col justify-between h-full group" hoverGlow={true}>
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag label={project.category} variant="accent" size="sm" />
            {isSIH && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold animate-pulse">
                <Award className="w-3 h-3 text-amber-400" /> SIH '25 FINALIST
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-500 shrink-0">{project.period}</span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2 mb-3">
          <span>{project.title}</span>
        </h3>

        {/* Short Metric Badge */}
        {project.metric && (
          <div className="inline-block px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            ⚡ {project.metric}
          </div>
        )}

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.desc}
        </p>
      </div>

      {/* Footer & Tech Stack Tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="default" size="sm" />
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenCaseStudy(project)}
            icon={<ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            className="text-indigo-300 hover:text-white px-0"
          >
            Deep Case Study
          </Button>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-colors"
                title="View Live Product Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
