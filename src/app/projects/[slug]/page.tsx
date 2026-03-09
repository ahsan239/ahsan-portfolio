'use client';

import { Navigation } from "@/components/navigation";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, limit } from "firebase/firestore";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { AIDemo } from "@/components/ai-demo";
import { ChevronLeft, Github, ExternalLink, Code, Loader2, Target, Zap } from "lucide-react";
import Link from "next/link";

/**
 * @fileOverview Individual project case study page.
 * Aligns with PRD Section 3.1 (Dynamic Project Showcase).
 */

const OWNER_ID = "alex-rivera";

export default function ProjectPage() {
  const params = useParams();
  const db = useFirestore();
  const slug = params?.slug as string;

  const projectQuery = useMemoFirebase(() => {
    if (!slug) return null;
    return query(
      collection(db, 'users', OWNER_ID, 'projects'),
      where('slug', '==', slug),
      limit(1)
    );
  }, [db, slug]);

  const { data: projectResults, isLoading } = useCollection(projectQuery);
  const project = projectResults?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  if (!isLoading && !project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body dot-pattern overflow-x-hidden">
      <Navigation />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ChevronLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Engineering Portfolio
          </Link>

          <header className="grid lg:grid-cols-12 gap-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-8 space-y-8">
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-gradient">
                {project.title}
               </h1>
               <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end gap-6 border-l border-white/10 pl-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Business Impact</p>
                  <p className="text-2xl font-bold">{project.businessImpact || "N/A"}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Core ROI</p>
                  <p className="text-2xl font-bold">{project.roiMetric || "N/A"}</p>
               </div>
            </div>
          </header>

          <div className="relative aspect-[21/9] w-full mb-32 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group animate-in zoom-in-95 duration-700">
            <Image
              src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1200/600`}
              alt={project.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              priority
              data-ai-hint="project showcase"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
          </div>

          <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-7 space-y-24">
              <section className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <span className="text-xs font-black uppercase tracking-widest">01 // The Problem</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex gap-6 items-start">
                   <Target className="h-8 w-8 text-primary shrink-0 mt-1" />
                   <p className="text-2xl font-light leading-relaxed text-foreground italic">
                    "{project.problem || project.summary}"
                   </p>
                </div>
              </section>

              <section className="space-y-8 animate-in fade-in slide-in-from-left-4 [animation-delay:200ms] duration-500">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <span className="text-xs font-black uppercase tracking-widest">02 // The Solution</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex gap-6 items-start">
                   <Zap className="h-8 w-8 text-accent shrink-0 mt-1" />
                   <p className="text-xl font-medium leading-relaxed text-muted-foreground">
                    {project.solution || "Implementing a custom high-performance solution focused on scalability."}
                   </p>
                </div>
              </section>

              <section className="space-y-10 p-12 bg-white/[0.02] rounded-[3rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Code size={120} />
                </div>
                <div className="flex items-center gap-4 text-primary relative z-10">
                  <Code className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Technical Implementation</span>
                </div>
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <h4 className="text-lg font-black uppercase tracking-tight">Architecture Strategy</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Leveraging {project.technologies?.slice(0, 3).join(', ')} to architect a serverless, event-driven system that ensures maximum uptime and minimal operational overhead.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-5 sticky top-32 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <AIDemo />
               
               <div className="space-y-8 p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 shadow-xl">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Project Resources</h3>
                  <div className="space-y-4">
                    {project.projectLink && (
                      <Link href={project.projectLink} target="_blank" className="flex items-center justify-between p-5 bg-white/5 hover:bg-primary hover:text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-lg">
                        Live Demo <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank" className="flex items-center justify-between p-5 bg-white/5 hover:bg-primary hover:text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-lg">
                        Source Code <Github className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
