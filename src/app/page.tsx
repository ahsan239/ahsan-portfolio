
"use client";

import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { 
  ArrowRight, Database, Layers, Mail, Github, 
  Linkedin, Briefcase, Terminal, Sparkles, CheckCircle2, Code2,
  Zap, ShieldCheck, Globe, Cpu, Flame
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";

const OWNER_ID = "alex-rivera";

export default function Home() {
  const db = useFirestore();

  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db]);
  const projectsQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc')), [db]);
  const experiencesQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc')), [db]);

  const { data: profile } = useDoc(profileRef);
  const { data: projects, isLoading: projectsLoading } = useCollection(projectsQuery);
  const { data: experiences, isLoading: experiencesLoading } = useCollection(experiencesQuery);

  const techArsenal = [
    { name: "Next.js 15", category: "FRONTEND", icon: <Zap size={18} />, desc: "App Router, RSC, Server Actions" },
    { name: "React 19", category: "FRONTEND", icon: <Code2 size={18} />, desc: "Concurrent rendering, Hooks" },
    { name: "TypeScript", category: "LANGUAGE", icon: <ShieldCheck size={18} />, desc: "Type-safe development" },
    { name: "JavaScript (ES6+)", category: "LANGUAGE", icon: <Globe size={18} />, desc: "Modern web standard" },
    { name: "Node.js", category: "BACKEND", icon: <Cpu size={18} />, desc: "Scalable server environments" },
    { name: "Express.js", category: "BACKEND", icon: <Database size={18} />, desc: "Minimalist web framework" },
    { name: "Firebase", category: "CLOUD/DB", icon: <Flame size={18} />, desc: "Real-time apps & Auth" },
    { name: "MongoDB", category: "DATABASE", icon: <Layers size={18} />, desc: "NoSQL document storage" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden selection:bg-primary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-72 pb-20">
        <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
          <Badge variant="secondary" className="mb-12 py-2.5 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Open to select opportunities</span>
            </span>
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 max-w-5xl mx-auto leading-[0.9] animate-fade-in-up uppercase">
            Building digital <span className="text-gradient italic pr-3">products</span> that matter.
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-in-up [animation-delay:200ms]">
            {profile?.headline || "Senior Software Engineer & AI Architect. I design and engineer high-performance systems for the modern web."}
          </p>

          <div className="flex flex-wrap justify-center gap-5 mb-24 animate-fade-in-up [animation-delay:400ms]">
            <Button asChild size="lg" className="rounded-full px-12 h-16 font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
              <Link href="/#projects">View Projects <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 font-black uppercase tracking-widest text-sm border-white/10 hover:bg-white/5 transition-all">
              <Link href="/about">My Story</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-10 opacity-30 animate-fade-in-up [animation-delay:600ms]">
            <Link href="https://github.com/alexrivera" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Github size={28} /></Link>
            <Link href="https://linkedin.com/in/alexrivera" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Linkedin size={28} /></Link>
            <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`} className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Mail size={28} /></Link>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none italic uppercase">
              Proven results in <span className="text-muted-foreground">engineering.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsLoading ? (
               <p className="text-muted-foreground italic py-20">Syncing projects...</p>
            ) : projects && projects.length > 0 ? (
              projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project as any} index={idx} />
              ))
            ) : (
              <p className="text-muted-foreground italic py-20">No projects found. Add them in the CMS.</p>
            )}
          </div>
        </div>
      </section>

      {/* Technical Arsenal - Redesigned Grid */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-primary/5 mb-6">
              Technical Arsenal
            </Badge>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
              Technologies <br />
              I use to <span className="text-primary italic">Build.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techArsenal.map((tech) => (
              <Card key={tech.name} className="glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2.5rem] bg-white/[0.02] overflow-hidden group">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-xl">
                      {tech.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {tech.category}
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-1">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary">Career Path</h2>
              <h3 className="text-5xl font-black tracking-tighter italic uppercase">Professional Journey</h3>
            </div>

            <div className="space-y-6">
              {experiencesLoading ? (
                <p className="text-center text-muted-foreground">Loading history...</p>
              ) : experiences && experiences.length > 0 ? (
                experiences.map((exp, idx) => (
                  <div key={exp.id} className="group relative pl-12 before:absolute before:left-[11px] before:top-4 before:bottom-0 before:w-[1px] before:bg-white/5 last:before:hidden">
                    <div className="absolute left-0 top-3 h-6 w-6 rounded-full bg-background border border-primary flex items-center justify-center group-hover:scale-125 transition-transform">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/30 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <h4 className="text-2xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tighter">{exp.role}</h4>
                          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs mt-1">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit h-8 px-4 rounded-full border-white/10 text-muted-foreground text-[10px] font-black uppercase tracking-widest">{exp.duration}</Badge>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-4">
                         {exp.points?.map((point: string, pIdx: number) => (
                           <li key={pIdx} className="flex gap-4 text-sm text-muted-foreground leading-relaxed font-light">
                              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                              <span>{point}</span>
                           </li>
                         ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground italic">No career entries yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strategy */}
      <section id="contact" className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
             <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase text-gradient">
              Let's build <br />something great.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Available for select full-stack architecture, software engineering, and engineering leadership roles.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <Button asChild size="lg" className="rounded-full px-12 h-20 font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform uppercase tracking-widest">
                <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`}>Email Me</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-20 font-black text-xl border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest">
                <Link href="https://linkedin.com/in/alexrivera" target="_blank">LinkedIn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              <Code2 size={20} />
            </div>
            <span className="font-black tracking-tighter uppercase text-xl">ALEX.DEV</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.5em] opacity-40">Engineering with precision since 2014</p>
          <div className="flex gap-10">
            <Link href="/cms" className="text-[10px] text-primary hover:underline transition-all uppercase tracking-[0.3em] font-black">Dashboard</Link>
            <Link href="https://github.com/alexrivera" target="_blank" className="text-[10px] text-muted-foreground hover:text-primary transition-all uppercase tracking-[0.3em] font-black">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
