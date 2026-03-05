
"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/lib/projects";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block relative overflow-hidden rounded-2xl border border-white/5 bg-card transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5",
        featured ? "md:col-span-2 md:row-span-2" : "col-span-1"
      )}
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint="ai project preview"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground border-none font-bold py-1 px-3 shadow-lg flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" />
            {project.roiMetric.split(' ')[0]} Win
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="space-y-1">
          <h3 className="text-xl font-headline font-bold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-semibold text-primary">{project.businessImpact}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                {tech}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Case Study <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

import { cn } from "@/lib/utils";
