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
    { name: "Next.js 15", category: "FRONTEND", icon: <Zap size={18} />, color: "text-blue-400", desc: "App Router, RSC, Server Actions" },
    { name: "React 19", category: "FRONTEND", icon: <Code2 size={18} />, color: "text-cyan-400", desc: "Concurrent rendering, Hooks" },
    { name: "TypeScript", category: "LANGUAGE", icon: <ShieldCheck size={18} />, color: "text-blue-500", desc: "Type-safe development" },
    { name: "JavaScript", category: "LANGUAGE", icon: <Globe size={18} />, color: "text-yellow-400", desc: "Modern web standard" },
    { name: "Node.js", category: "BACKEND", icon: <Cpu size={18} />, color: "text-green-500", desc: "Scalable server environments" },
    { name: "Express.js", category: "BACKEND", icon: <Database size={18} />, color: "text-emerald-400", desc: "Minimalist web framework" },
    { name: "Firebase", category: "CLOUD/DB", icon: <Flame size={18} />, color: "text-orange-500", desc: "Real-time apps & Auth" },
    { name: "MongoDB", category: "DATABASE", icon: <Layers size={18} />, color: "text-green-600", desc: "NoSQL document storage" },
    { name: "GraphQL", category: "API", icon: <Share2 size={18} />, color: "text-pink-500", desc: "Flexible data fetching" },
    { name: "Google Apps Script", category: "AUTOMATION", icon: <Terminal size={18} />, color: "text-blue-600", desc: "Productivity workflows" },
    { name: "Tailwind CSS", category: "STYLING", icon: <Palette size={18} />, color: "text-sky-400", desc: "Utility-first CSS framework" },
    { name: "Generative AI", category: "AI", icon: <Sparkles size={18} />, color: "text-purple-400", desc: "LLM & GenAI integration" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden selection:bg-primary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-72 pb-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48 text-center z-10 flex flex-col items-center">
          <Badge variant="secondary" className="mb-12 py-2.5 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Open to select opportunities</span>
            </span>
          </Badge>
          
          <h1 className="text-5xl font-bold tracking-tighter mb-10 max-w-4xl mx-auto leading-[0.9] animate-fade-in-up uppercase">
            Building digital <span className="text-gradient italic pr-2">products</span> that matter.
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-in-up [animation-delay:200ms]">
            {profile?.headline || "Senior Software Engineer & AI Architect. I design and engineer high-performance systems for the modern web."}
          </p>

          <div className="flex flex-wrap justify-center gap-5 mb-24 animate-fade-in-up [animation-delay:400ms]">
            <Button asChild size="lg" className="rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
              <Link href="/#projects">View Projects <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-16 font-bold uppercase tracking-widest text-sm border-white/10 hover:bg-white/5 transition-all">
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

      {/* The Philosophy Section */}
      <section id="philosophy" className="py-40 relative">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 py-1 px-4 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-primary/5">
                    Engineering Creed
                  </Badge>
                </div>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase">
                  Efficiency Through <br />
                  <span className="text-primary italic">Intelligence,</span> <br />
                  Scale Through <span className="text-muted-foreground/30">Design.</span>
                </h3>
              </div>

              <div className="space-y-10 max-w-2xl">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
                    <Target size={14} className="text-primary" />
                    The Automation Mindset
                  </h4>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    I architect high-performance web applications using React and Next.js, while simultaneously leveraging <strong className="text-foreground font-bold underline decoration-primary/30">Google Apps Script</strong> to bridge the gap between engineering and operational excellence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold tracking-tighter">02+</p>
                      <User size={16} className="text-primary/50" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Professional <br />Years Experience</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold tracking-tighter">10+</p>
                      <Rocket size={16} className="text-accent/50" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-tight">Enterprise <br />Automations Deployed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 sticky top-32">
              <Card className="glass-card border-white/5 rounded-[3.5rem] overflow-hidden group hover:border-primary/20 transition-all duration-700 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                <CardContent className="p-8 lg:p-12 space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Terminal size={18} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Strategic Stack</p>
                          <p className="text-[9px] font-bold text-muted-foreground/60 uppercase">System Integration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-bold text-green-500/80 uppercase tracking-widest">Live Engine</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Next.js 15", icon: <Zap size={12} /> },
                        { name: "React 19", icon: <Code2 size={12} /> },
                        { name: "Apps Script", icon: <Terminal size={12} /> },
                        { name: "Firebase", icon: <Flame size={12} /> },
                        { name: "TypeScript", icon: <ShieldCheck size={12} /> },
                        { name: "Tailwind", icon: <Palette size={12} /> }
                      ].map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-transparent hover:bg-muted/40 hover:border-primary/20 transition-all cursor-default group/item">
                          <div className="text-primary group-hover/item:scale-110 transition-transform">
                            {tech.icon}
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80 group-hover/item:text-foreground transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8 pt-10 border-t border-white/5">
                    <div className="flex gap-6 group/benefit">
                      <div className="h-14 w-14 shrink-0 rounded-[1.25rem] bg-muted/20 border border-transparent flex items-center justify-center text-primary group-hover/benefit:scale-110 group-hover/benefit:bg-primary/5 group-hover/benefit:border-primary/20 transition-all duration-500">
                        <Activity size={24} />
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold uppercase tracking-widest text-xs text-foreground group-hover/benefit:text-primary transition-colors">Zero Latency</h5>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-light">Performance-first architecture ensuring sub-200ms interactions at every touchpoint.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group/benefit">
                      <div className="h-14 w-14 shrink-0 rounded-[1.25rem] bg-muted/20 border border-transparent flex items-center justify-center text-accent group-hover/benefit:scale-110 group-hover/benefit:bg-accent/5 group-hover/benefit:border-accent/20 transition-all duration-500">
                        <ShieldCheck size={24} />
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold uppercase tracking-widest text-xs text-foreground group-hover/benefit:text-accent transition-colors">Bulletproof Logic</h5>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-light">Robust, type-safe systems designed for mission-critical reliability and zero-drift state.</p>
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
      <section id="arsenal" className="py-40 relative">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48">
          <div className="mb-16">
            <Badge variant="outline" className="text-primary border-primary/20 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5 mb-6">
              Technical Arsenal
            </Badge>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight uppercase">
              Technologies <br />
              I use to <span className="text-primary italic">Build.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techArsenal.map((tech) => (
              <Card key={tech.name} className="glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2.5rem] bg-white/[0.02] overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                <CardContent className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center ${tech.color} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl`}>
                      {tech.icon}
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-primary/20 group-hover:text-primary/70 transition-colors">
                      {tech.category}
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-xl font-semibold uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-none italic uppercase">
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
      <section id="experience" className="py-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary">Career Path</h2>
              <h3 className="text-5xl font-bold tracking-tighter italic uppercase">Professional Journey</h3>
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
                          <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tighter">{exp.role}</h4>
                          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mt-1">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit h-8 px-4 rounded-full border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{exp.duration}</Badge>
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
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
             <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] italic uppercase text-gradient">
              Let's build <br />something great.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Available for select full-stack architecture, software engineering, and engineering leadership roles.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <Button asChild size="lg" className="rounded-full px-12 h-20 font-bold text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-transform uppercase tracking-widest">
                <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`}>Email Me</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="glass-card rounded-full px-12 h-20 font-bold text-xl border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest">
                <Link href="https://linkedin.com/in/alexrivera" target="_blank">LinkedIn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              <Code2 size={20} />
            </div>
            <span className="font-bold tracking-tighter uppercase text-xl">ALEX.DEV</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.5em] opacity-40">Engineering with precision since 2014</p>
          <div className="flex gap-10">
            <Link href="/cms" className="text-[10px] text-primary hover:underline transition-all uppercase tracking-[0.3em] font-bold">Dashboard</Link>
            <Link href="https://github.com/alexrivera" target="_blank" className="text-[10px] text-muted-foreground hover:text-primary transition-all uppercase tracking-[0.3em] font-bold">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
