"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/lib/projects";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block perspective-1000",
        featured ? "md:col-span-2 md:row-span-1" : "col-span-1"
      )}
    >
      <div className="relative glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 preserve-3d group-hover:rotate-x-2 group-hover:rotate-y-2 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(147,51,234,0.2)]">
        <div className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[21/9]" : "aspect-[16/10]"
        )}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            data-ai-hint="project visual"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          
          <div className="absolute top-6 right-6">
            <Badge className="bg-white text-black border-none font-black py-1.5 px-4 rounded-full shadow-2xl flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              {project.roiMetric.split(' ')[0]} GROWTH
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/80">{project.businessImpact}</p>
              <h3 className="text-2xl md:text-3xl font-headline font-black text-white leading-none">
                {project.title}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary transition-colors">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-muted-foreground leading-relaxed line-clamp-2 font-light">
            {project.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-white/5 border border-white/5 text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
