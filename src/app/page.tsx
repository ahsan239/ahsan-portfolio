"use client";

import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { 
  ArrowRight, Database, Layers, Mail, Github, 
  Linkedin, Briefcase, Terminal, Sparkles, Code2,
  Zap, ShieldCheck, Globe, Cpu, Flame, Share2, Palette,
  Activity, Target, Calendar, Award
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

const OWNER_ID = "ahsan";

export default function Home() {
  const db = useFirestore();

  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db]);
  const projectsQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc')), [db]);
  const experiencesQuery = useMemoFirebase(() => query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc')), [db]);

  const { data: profile } = useDoc(profileRef);
  const { data: projects, isLoading: projectsLoading } = useCollection(projectsQuery);
  const { data: experiences, isLoading: expLoading } = useCollection(experiencesQuery);

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

  const defaultExperiences = [
    {
      id: "exp-1",
      role: "Senior Software Engineer",
      company: "InnovateTech Solutions",
      duration: "Jan 2023 — Present",
      points: [
        "Architected scalable Next.js platforms increasing user engagement by 40%.",
        "Engineered automated workflows with Google Apps Script, saving 15+ hours weekly in data processing.",
        "Led a team of 5 developers in delivering production-ready AI integrated features."
      ],
      type: "Full-Time"
    }
  ];

  const displayExperiences = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-48 md:pt-60 lg:pt-72 pb-20 overflow-hidden">
        <div className="mesh-container">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="mesh-blob mesh-blob-4" />
        </div>

        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 text-center z-10 flex flex-col items-center">
          <Badge variant="secondary" className="mb-8 md:mb-12 py-2.5 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-primary">Open to select opportunities</span>
            </span>
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 md:mb-10 max-w-4xl mx-auto leading-[1] md:leading-[0.9] animate-fade-in-up [animation-delay:100ms] uppercase text-foreground">
            Building digital <span className="text-gradient italic pr-2">products</span> that matter.
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed font-normal tracking-tight animate-fade-in-up [animation-delay:300ms]">
            {profile?.headline || "Senior Software Engineer specializing in building scalable digital systems and intelligent automation workflows."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mb-16 md:mb-24 animate-fade-in-up [animation-delay:500ms] w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all duration-300 w-full sm:w-auto">
              <Link href="/#projects">View Projects <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm border-white/10 hover:bg-white/5 hover:scale-[1.05] transition-all duration-300 w-full sm:w-auto">
              <Link href="/about">My Story</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-10 opacity-30 animate-fade-in-up [animation-delay:700ms]">
            <Link href="https://github.com/ahsan239" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Github size={24} /></Link>
            <Link href="https://www.linkedin.com/in/mohd-ahsan-5b40b31b1/" target="_blank" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Linkedin size={24} /></Link>
            <Link href="mailto:ahsan000k@gmail.com" className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Mail size={24} /></Link>
          </div>
        </div>
      </section>

      {/* The Philosophy Section */}
      <section id="philosophy" className="py-20 md:py-40 relative border-t border-white/5">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-12 md:space-y-16 animate-fade-in-up">
              <div className="space-y-6 md:space-y-8">
                <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5 mb-6">
                  Engineering Creed
                </Badge>
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] md:leading-[0.85] uppercase text-foreground">
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
                  <div className="space-y-4 md:space-y-6 text-lg md:text-2xl text-muted-foreground leading-relaxed font-normal tracking-tight">
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
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">02+</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Professional <br />Years Experience</p>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">10+</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Enterprise <br />Automations Deployed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 animate-fade-in-up [animation-delay:200ms]">
              <Card className="glass-card border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group hover:border-primary/20 hover:scale-[1.02] transition-all duration-700 shadow-2xl">
                <CardContent className="p-6 md:p-8 lg:p-12 space-y-10 md:space-y-12">
                  <div className="space-y-8 md:space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Terminal size={18} />
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
                        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed font-normal tracking-tight">Performance-first architecture ensuring sub-200ms interactions at every touchpoint.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 md:gap-6 group/benefit">
                      <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-[1.2rem] md:rounded-[1.5rem] bg-muted/20 border border-transparent flex items-center justify-center text-accent group-hover/benefit:scale-110 group-hover/benefit:bg-accent/5 group-hover/benefit:border-accent/20 transition-all duration-500">
                        <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <h5 className="font-bold uppercase tracking-widest text-xs md:text-sm text-foreground group-hover/benefit:text-accent transition-colors">Bulletproof Logic</h5>
                        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed font-normal tracking-tight">Robust, type-safe systems designed for mission-critical reliability and zero-drift state.</p>
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
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 animate-fade-in-up">
          <div className="mb-12 md:mb-20">
            <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5 mb-6">
              Technical Arsenal
            </Badge>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight uppercase text-foreground">
              Technologies <br className="hidden sm:block" />
              I use to <span className="text-primary italic">Build.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techArsenal.map((tech, idx) => (
              <Card key={tech.name} className={cn(
                "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] shadow-xl animate-fade-in-up",
                tech.glow
              )} style={{ animationDelay: `${idx * 50}ms` }}>
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
                    <h4 className="text-lg md:text-xl font-semibold uppercase tracking-tighter group-hover:text-primary transition-colors text-foreground">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-muted-foreground font-normal leading-relaxed tracking-tight">
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

      {/* Professional Journey (Experience Timeline) */}
      <section id="experience" className="py-20 md:py-40 relative border-t border-white/5">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 animate-fade-in-up">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5">
                Career Milestone
              </Badge>
              <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight uppercase text-foreground">
                Professional <br className="hidden sm:block" />
                <span className="text-primary italic">Journey.</span>
              </h3>
            </div>
          </div>

          <div className="relative">
            {/* Main Vertical Line */}
            <div className="absolute left-[1.1rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:left-1/2 md:translate-x-[-0.5px]" />

            <div className="space-y-16">
              {expLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Activity className="animate-spin text-primary mr-2" />
                  <p className="text-muted-foreground italic text-xs uppercase tracking-widest">Syncing Timeline...</p>
                </div>
              ) : displayExperiences.map((exp: any, idx) => (
                <div key={exp.id || idx} className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 group animate-fade-in-up",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )} style={{ animationDelay: `${idx * 150}ms` }}>
                  
                  {/* Timeline Point */}
                  <div className="absolute left-[1.1rem] top-0 h-9 w-9 md:left-1/2 md:translate-x-[-1.125rem] z-10 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)] ring-4 ring-background group-hover:scale-150 transition-transform duration-500" />
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "w-full md:w-[45%] space-y-4 pl-12 md:pl-0",
                    idx % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <Card className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5 group-hover:border-primary/30 transition-all duration-500 shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         {exp.type === "Internship" ? <Calendar size={60} /> : <Award size={60} />}
                      </div>
                      
                      <div className={cn(
                        "flex flex-col gap-2 mb-6",
                        idx % 2 === 0 ? "md:items-end" : "md:items-start"
                      )}>
                        <div className="flex items-center gap-3">
                           {idx % 2 === 0 && <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full md:block hidden">{exp.type}</span>}
                           <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors leading-none">
                             {exp.role}
                           </h4>
                           {idx % 2 !== 0 && <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full md:block hidden">{exp.type}</span>}
                           <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full md:hidden">{exp.type}</span>
                        </div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                          {exp.company}
                        </p>
                        <Badge variant="outline" className="w-fit text-[9px] font-bold uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
                           {exp.duration}
                        </Badge>
                      </div>

                      <ul className={cn(
                        "space-y-3",
                        idx % 2 === 0 ? "md:items-end text-right" : "md:items-start text-left"
                      )}>
                        {exp.points?.map((point: string, pIdx: number) => (
                          <li key={pIdx} className={cn(
                            "flex gap-3 text-xs text-muted-foreground font-normal leading-relaxed tracking-tight",
                            idx % 2 === 0 ? "md:flex-row-reverse" : "flex-row"
                          )}>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* Empty space for the other side on desktop */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 animate-fade-in-up">
          <div className="mb-12 md:mb-20 max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-6xl font-bold tracking-tight leading-none italic uppercase text-foreground">
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

      {/* Contact Strategy */}
      <section id="contact" className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 text-center animate-fade-in-up">
          <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
            <h2 className="text-4xl sm:text-5_6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] md:leading-[0.85] italic uppercase text-gradient">
              Let's build <br className="hidden md:block" /> something <span className="text-foreground">great.</span>
            </h2>
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              <p className="text-lg md:text-2xl text-muted-foreground font-normal tracking-tight leading-relaxed">
                If you're looking for someone who can turn complex ideas into efficient, scalable solutions, you're in the right place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 w-full sm:w-auto">
              <Button asChild size="lg" className="rounded-full px-12 h-16 md:h-20 font-bold text-lg md:text-xl shadow-2xl shadow-primary/30 hover:scale-[1.05] transition-all duration-300 uppercase tracking-widest w-full sm:w-auto">
                <Link href={`mailto:${profile?.contactEmail || 'ahsan000k@gmail.com'}`}>Email Me</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 md:h-20 font-bold text-lg md:text-xl border-white/10 hover:bg-white/5 hover:scale-[1.05] transition-all duration-300 uppercase tracking-widest w-full sm:w-auto">
                <Link href="https://www.linkedin.com/in/mohd-ahsan-5b40b31b1/" target="_blank">LinkedIn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
