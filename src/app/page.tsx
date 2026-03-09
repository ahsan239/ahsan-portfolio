"use client";

import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { 
  ArrowRight, Database, Layers, Mail, Github, 
  Linkedin, Briefcase, Terminal, Sparkles, CheckCircle2, Code2,
  Zap, ShieldCheck, Globe, Cpu, Flame, Share2, Palette,
  Activity, User, Target, Rocket
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

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
    { name: "Next.js 15", category: "FRONTEND", icon: <Zap size={24} />, color: "text-blue-400", glow: "hover:shadow-blue-500/20", desc: "App Router, RSC, Server Actions" },
    { name: "React 19", category: "FRONTEND", icon: <Code2 size={24} />, color: "text-cyan-400", glow: "hover:shadow-cyan-400/20", desc: "Concurrent rendering, Hooks" },
    { name: "TypeScript", category: "LANGUAGE", icon: <ShieldCheck size={24} />, color: "text-blue-500", glow: "hover:shadow-blue-500/20", desc: "Type-safe development" },
    { name: "JavaScript", category: "LANGUAGE", icon: <Globe size={24} />, color: "text-yellow-400", glow: "hover:shadow-yellow-400/20", desc: "Modern web standard" },
    { name: "Node.js", category: "BACKEND", icon: <Cpu size={24} />, color: "text-green-500", glow: "hover:shadow-green-500/20", desc: "Scalable server environments" },
    { name: "Express.js", category: "BACKEND", icon: <Database size={24} />, color: "text-emerald-400", glow: "hover:shadow-emerald-400/20", desc: "Minimalist web framework" },
    { name: "Firebase", category: "CLOUD/DB", icon: <Flame size={24} />, color: "text-orange-500", glow: "hover:shadow-orange-500/20", desc: "Real-time apps & Auth" },
    { name: "MongoDB", category: "DATABASE", icon: <Layers size={24} />, color: "text-green-600", glow: "hover:shadow-green-600/20", desc: "NoSQL document storage" },
    { name: "GraphQL", category: "API", icon: <Share2 size={24} />, color: "text-pink-500", glow: "hover:shadow-pink-500/20", desc: "Flexible data fetching" },
    { name: "Google Apps Script", category: "AUTOMATION", icon: <Terminal size={24} />, color: "text-blue-600", glow: "hover:shadow-blue-600/20", desc: "Productivity workflows" },
    { name: "Tailwind CSS", category: "STYLING", icon: <Palette size={24} />, color: "text-sky-400", glow: "hover:shadow-sky-400/20", desc: "Utility-first CSS framework" },
    { name: "Generative AI", category: "AI", icon: <Sparkles size={24} />, color: "text-purple-400", glow: "hover:shadow-purple-400/20", desc: "LLM & GenAI integration" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden selection:bg-primary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-48 md:pt-60 lg:pt-72 pb-20">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 text-center z-10 flex flex-col items-center">
          <Badge variant="secondary" className="mb-8 md:mb-12 py-2.5 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Open to select opportunities</span>
            </span>
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 md:mb-10 max-w-4xl mx-auto leading-[1] md:leading-[0.9] animate-fade-in-up uppercase">
            Building digital <span className="text-gradient italic pr-2">products</span> that matter.
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed font-light animate-fade-in-up [animation-delay:200ms]">
            {profile?.headline || "Senior Software Engineer & AI Architect. I design and engineer high-performance systems for the modern web."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mb-16 md:mb-24 animate-fade-in-up [animation-delay:400ms] w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto">
              <Link href="/#projects">View Projects <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto">
              <Link href="/about">My Story</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-10 opacity-30 animate-fade-in-up [animation-delay:600ms]">
            <Link href="https://github.com/alexrivera" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Github size={24} className="md:size-7" /></Link>
            <Link href="https://linkedin.com/in/alexrivera" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Linkedin size={24} className="md:size-7" /></Link>
            <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`} className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Mail size={24} className="md:size-7" /></Link>
          </div>
        </div>
      </section>

      {/* The Philosophy Section */}
      <section id="philosophy" className="py-20 md:py-40 relative border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5">
                  Engineering Creed
                </Badge>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[1] md:leading-[0.85] uppercase">
                  Efficiency Through <br className="hidden sm:block" />
                  <span className="text-primary italic">Intelligence,</span> <br className="hidden sm:block" />
                  Scale Through <span className="text-muted-foreground/30">Design.</span>
                </h3>
              </div>

              <div className="space-y-10 md:space-y-12 max-w-3xl">
                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
                    <Target size={14} className="text-primary" />
                    The Automation Mindset
                  </h4>
                  <div className="space-y-4 md:space-y-6 text-lg md:text-2xl text-muted-foreground leading-relaxed font-light">
                    <p>
                      Modern web developer focused on React, Next.js, Node.js, and Firebase, with expertise in Google Apps Script automation to streamline and optimize business processes.
                    </p>
                    <p>
                      I build scalable, high-performance applications and automation solutions that improve workflows, enhance productivity, and deliver seamless user experiences.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 md:gap-12 pt-10 md:pt-12 border-t border-white/5">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter">02+</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Professional <br />Years Experience</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter">10+</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Enterprise <br />Automations Deployed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <Card className="glass-card border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group hover:border-primary/20 transition-all duration-700 shadow-2xl">
                <CardContent className="p-6 md:p-8 lg:p-12 space-y-10 md:space-y-12">
                  <div className="space-y-8 md:space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Terminal className="h-[18px] w-[18px] md:h-5 md:w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary">Strategic Stack</p>
                          <p className="text-[8px] md:text-[9px] font-bold text-muted-foreground/60 uppercase">System Integration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-bold text-green-500/80 uppercase tracking-widest">Live Engine</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {[
                        { name: "Next.js 15", icon: <Zap size={14} /> },
                        { name: "React 19", icon: <Code2 size={14} /> },
                        { name: "Apps Script", icon: <Terminal size={14} /> },
                        { name: "Firebase", icon: <Flame size={14} /> },
                        { name: "TypeScript", icon: <ShieldCheck size={14} /> },
                        { name: "Tailwind", icon: <Palette size={14} /> }
                      ].map((tech) => (
                        <div key={tech.name} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-muted/20 border border-transparent hover:bg-muted/30 hover:border-primary/20 transition-all cursor-default group/item">
                          <div className="text-primary group-hover/item:scale-110 transition-transform">
                            {tech.icon}
                          </div>
                          <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 group-hover/item:text-foreground transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8 md:space-y-10 pt-8 md:pt-10 border-t border-white/5">
                    <div className="flex gap-4 md:gap-6 group/benefit">
                      <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-[1.2rem] md:rounded-[1.5rem] bg-muted/20 border border-transparent flex items-center justify-center text-primary group-hover/benefit:scale-110 group-hover/benefit:bg-primary/5 group-hover/benefit:border-primary/20 transition-all duration-500">
                        <Activity className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <h5 className="font-bold uppercase tracking-widest text-xs md:text-sm text-foreground group-hover/benefit:text-primary transition-colors">Zero Latency</h5>
                        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed font-light">Performance-first architecture ensuring sub-200ms interactions at every touchpoint.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 md:gap-6 group/benefit">
                      <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-[1.2rem] md:rounded-[1.5rem] bg-muted/20 border border-transparent flex items-center justify-center text-accent group-hover/benefit:scale-110 group-hover/benefit:bg-accent/5 group-hover/benefit:border-accent/20 transition-all duration-500">
                        <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <h5 className="font-bold uppercase tracking-widest text-xs md:text-sm text-foreground group-hover/benefit:text-accent transition-colors">Bulletproof Logic</h5>
                        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed font-light">Robust, type-safe systems designed for mission-critical reliability and zero-drift state.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Arsenal */}
      <section id="arsenal" className="py-20 md:py-40 relative">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          <div className="mb-12 md:mb-20">
            <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5 mb-6">
              Technical Arsenal
            </Badge>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight uppercase">
              Technologies <br className="hidden sm:block" />
              I use to <span className="text-primary italic">Build.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techArsenal.map((tech) => (
              <Card key={tech.name} className={cn(
                "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] overflow-hidden group hover:-translate-y-2 shadow-xl",
                tech.glow
              )}>
                <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-10 md:mb-12">
                    <div className={cn(
                      "h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:bg-white/10",
                      tech.color
                    )}>
                      {tech.icon}
                    </div>
                    <span className="text-[8px] md:text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                      {tech.category}
                    </span>
                  </div>
                  
                  <div className="mt-auto space-y-2">
                    <h4 className="text-lg md:text-xl font-semibold uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-muted-foreground font-light leading-relaxed tracking-tight">
                      {tech.desc}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          <div className="mb-12 md:mb-20 max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-6xl font-bold tracking-tight leading-none italic uppercase">
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

      {/* Experience Timeline */}
      <section id="experience" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary">Career Path</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter italic uppercase">Professional Journey</h3>
            </div>

            <div className="space-y-6">
              {experiencesLoading ? (
                <p className="text-center text-muted-foreground">Loading history...</p>
              ) : experiences && experiences.length > 0 ? (
                experiences.map((exp, idx) => (
                  <div key={exp.id} className="group relative pl-10 md:pl-12 before:absolute before:left-[11px] before:top-4 before:bottom-0 before:w-[1px] before:bg-white/5 last:before:hidden">
                    <div className="absolute left-0 top-3 h-6 w-6 rounded-full bg-background border border-primary flex items-center justify-center group-hover:scale-125 transition-transform">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 hover:border-primary/30 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tighter">{exp.role}</h4>
                          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit h-7 md:h-8 px-4 rounded-full border-white/10 text-muted-foreground text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{exp.duration}</Badge>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                         {exp.points?.map((point: string, pIdx: number) => (
                           <li key={pIdx} className="flex gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
                              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
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
      <section id="contact" className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 text-center">
          <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] md:leading-[0.85] italic uppercase text-gradient">
              Great software is built with clarity, performance, and reliability at its core.
            </h2>
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed">
                If you're looking for someone who can turn complex ideas into efficient, scalable solutions, you're in the right place.
              </p>
              <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-foreground animate-pulse">
                Let’s start building something great.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 w-full sm:w-auto">
              <Button asChild size="lg" className="rounded-full px-12 h-16 md:h-20 font-bold text-lg md:text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform uppercase tracking-widest w-full sm:w-auto">
                <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`}>Email Me</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 md:h-20 font-bold text-lg md:text-xl border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest w-full sm:w-auto">
                <Link href="https://linkedin.com/in/alexrivera" target="_blank">LinkedIn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              <Code2 className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <span className="font-bold tracking-tighter uppercase text-lg md:text-xl">ALEX.DEV</span>
          </div>
          <p className="text-[8px] md:text-[10px] text-muted-foreground font-mono uppercase tracking-[0.5em] opacity-40 text-center">Engineering with precision since 2014</p>
          <div className="flex gap-6 md:gap-10">
            <Link href="/cms" className="text-[8px] md:text-[10px] text-primary hover:underline transition-all uppercase tracking-[0.3em] font-bold">Dashboard</Link>
            <Link href="https://github.com/alexrivera" target="_blank" className="text-[8px] md:text-[10px] text-muted-foreground hover:text-primary transition-all uppercase tracking-[0.3em] font-bold">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
