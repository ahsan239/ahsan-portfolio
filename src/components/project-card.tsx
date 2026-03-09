"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      className="group relative flex flex-col glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1200/630`}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint="project visual"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />
        <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <ArrowUpRight className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map(tech => (
            <Badge key={tech} variant="secondary" className="bg-white/5 text-[10px] font-medium border-white/5">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {project.roiMetric || "ROI Optimized"}
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">0{index + 1}</span>
        </div>
      </div>
    </Link>
  );
}
