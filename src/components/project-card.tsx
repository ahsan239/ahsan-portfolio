"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block bg-background overflow-hidden"
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          data-ai-hint="project visual"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
           <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
              <ArrowUpRight className="h-8 w-8 text-white" />
           </div>
        </div>
      </div>

      <div className="p-10 space-y-6 relative z-10">
        <div className="flex items-center justify-between">
           <span className="text-[10px] font-black text-accent uppercase tracking-[0.5em]">0{index + 1} // {project.roiMetric.split(' ')[0]}</span>
           <div className="flex gap-2">
              {project.techStack.slice(0, 2).map(tech => (
                <span key={tech} className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded">
                  {tech}
                </span>
              ))}
           </div>
        </div>
        
        <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">
          {project.title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? "text-muted-foreground" : ""}>{word} </span>
          ))}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm line-clamp-2 font-light">
          {project.shortDescription}
        </p>
      </div>
      
      {/* Decorative hover line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-700 group-hover:w-full" />
    </Link>
  );
}