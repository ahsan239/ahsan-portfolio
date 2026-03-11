"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    imageUrl: string;
    technologies: string[];
    roiMetric: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col glass-card rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] h-full shadow-lg hover:shadow-2xl animate-fade-in-up",
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[1.2/1] relative overflow-hidden">
        <Image
          src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1200/630`}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
          data-ai-hint="project visual"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
        
        {/* Floating ID badge */}
        <div className="absolute top-6 left-6 h-8 w-8 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-black font-mono">
          0{index + 1}
        </div>

        {/* Arrow Button */}
        <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
           <ArrowUpRight className="h-6 w-6" />
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map(tech => (
            <Badge key={tech} variant="secondary" className="bg-white/5 text-[9px] font-black uppercase tracking-widest border-white/5 px-3 py-1 rounded-full group-hover:border-primary/30 transition-colors">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-black tracking-tighter leading-tight group-hover:text-primary transition-colors uppercase">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-light">
            {project.summary}
          </p>
        </div>

        <div className="pt-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {project.roiMetric || "ROI Optimized"}
          </div>
        </div>
      </div>
    </Link>
  );
}
