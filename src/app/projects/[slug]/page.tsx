
'use client';

import { Navigation } from "@/components/navigation";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, limit } from "firebase/firestore";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { AIDemo } from "@/components/ai-demo";
import { ChevronLeft, Github, ExternalLink, Code, Loader2, Target, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const params = useParams();
  const db = useFirestore();
  const slug = params?.slug as string;
  const [activeOwnerId, setActiveOwnerId] = useState<string>("ahsan");

  // Discover active user
  const usersQuery = useMemoFirebase(() => query(collection(db, 'users'), limit(1)), [db]);
  const { data: users } = useCollection(usersQuery);

  useEffect(() => {
    if (users && users.length > 0) {
      setActiveOwnerId(users[0].id);
    }
  }, [users]);

  const projectQuery = useMemoFirebase(() => {
    if (!slug) return null;
    return query(
      collection(db, 'users', activeOwnerId, 'projects'),
      where('slug', '==', slug),
      limit(1)
    );
  }, [db, slug, activeOwnerId]);

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
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 animate-fade-in">
            <ChevronLeft className="h-3 w-3" /> Back to Engineering Portfolio
          </Link>

          <header className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20 animate-fade-in-up">
            <div className="lg:col-span-8 space-y-6">
               <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[1] md:leading-[0.85] text-gradient">
                {project.title}
               </h1>
               <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string) => (
                    <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end gap-6 border-l border-white/10 pl-6">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Business Impact</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{project.businessImpact || "N/A"}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Core ROI</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{project.roiMetric || "N/A"}</p>
               </div>
            </div>
          </header>

          <div className="relative aspect-video w-full mb-16 md:mb-32 rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl group animate-fade-in [animation-delay:200ms]">
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

          <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className="lg:col-span-7 space-y-16 animate-fade-in-up [animation-delay:400ms]">
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <span className="text-[10px] font-black uppercase tracking-widest">01 // The Problem</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex gap-4 items-start">
                   <Target className="h-6 w-6 text-primary shrink-0 mt-1" />
                   <p className="text-lg md:text-2xl font-light leading-relaxed text-foreground italic">
                    "{project.problem || project.description}"
                   </p>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <span className="text-[10px] font-black uppercase tracking-widest">02 // The Solution</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex gap-4 items-start">
                   <Zap className="h-6 w-6 text-accent shrink-0 mt-1" />
                   <p className="text-base md:text-xl font-medium leading-relaxed text-muted-foreground">
                    {project.solution || "Implementing a custom high-performance solution focused on scalability."}
                   </p>
                </div>
              </section>

              {(project.architecture || project.codeSnippet) && (
                <section className="space-y-8 p-8 md:p-12 bg-white/[0.02] rounded-[2rem] border border-white/5 group">
                  <div className="flex items-center gap-4 text-primary">
                    <Code className="h-5 w-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Technical Implementation</span>
                  </div>
                  <div className="space-y-8">
                    {project.architecture && (
                      <div className="space-y-4">
                        <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-foreground">Architecture Strategy</h4>
                        <div className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono bg-black/20 p-4 rounded-xl">
                          {project.architecture}
                        </div>
                      </div>
                    )}
                    {project.codeSnippet && (
                      <div className="space-y-4">
                        <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-foreground">Core Logic Snippet</h4>
                        <pre className="text-xs p-6 bg-black/40 rounded-2xl border border-white/5 overflow-x-auto font-mono text-primary/80">
                          <code>{project.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 animate-fade-in-up [animation-delay:600ms]">
               <AIDemo />
               
               <div className="space-y-6 p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 shadow-xl">
                  <h3 className="text-lg font-black uppercase tracking-tighter text-foreground">Project Resources</h3>
                  <div className="space-y-4">
                    {project.projectLink && (
                      <Link href={project.projectLink} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                        Live Demo <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
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
