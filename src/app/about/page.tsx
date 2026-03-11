"use client";

import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  User, BrainCircuit, Zap, ShieldCheck, Heart, 
  Globe, Coffee, Rocket, Mail, Code2, Cpu, 
  Database, Flame, Layers, Share2, Terminal, 
  Palette, Sparkles, BookOpen, Hammer, Search,
  GraduationCap, School, Calendar, ArrowRight
} from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

const OWNER_ID = "ahsan";

export default function AboutPage() {
  const db = useFirestore();
  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db]);
  const { data: profile } = useDoc(profileRef);

  const values = [
    { 
      icon: <Zap className="text-yellow-400" />, 
      title: "Performance First", 
      desc: "Every millisecond counts. I architect systems that are fast by default, ensuring optimal user experiences.",
      glow: "hover:shadow-yellow-400/10"
    },
    { 
      icon: <ShieldCheck className="text-green-400" />, 
      title: "Production Ready", 
      desc: "Code is a liability until it's in production. I focus on tested, maintainable software.",
      glow: "hover:shadow-green-400/10"
    },
    { 
      icon: <BrainCircuit className="text-primary" />, 
      title: "AI Native", 
      desc: "Integrating LLMs and automation into core workflows to unlock new digital possibilities.",
      glow: "hover:shadow-primary/10"
    }
  ];

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

  const education = [
    {
      degree: " Bachelor of Technology (B.Tech) in Computer Science",
      institution: "Shri Ramswaroop College Of Engineering and Management",
      period: "2019 — 2023",
      score: "CGPA: 7.9",
      desc: "Studied computer science fundamentals including programming, software development, database management, and web technologies.",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      degree: "Intermediate (Class XII)",
      institution: "Pioneer Montessori Inter College",
      period: "2019",
      score: "71%",
      desc: "Completed higher secondary education with focus on core academic subjects while developing strong analytical skills.",
      icon: <School className="h-6 w-6" />
    },
    {
      degree: "High School (Class X)",
      institution: "Pioneer Montessori High School",
      period: "2017",
      score: "87%",
      desc: "Successfully completed secondary education with a focus on science and mathematics.",
      icon: <School className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          {/* Header */}
          <header className="space-y-6 md:space-y-10 mb-20 md:mb-32 animate-fade-in-up">
            <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                <User size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Engineering Philosophy</span>
              </span>
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] uppercase italic text-foreground">
              Solving with <br className="hidden sm:block" /> <span className="text-gradient">precision.</span>
            </h1>
            <div className="space-y-4 md:space-y-6 max-w-4xl animate-fade-in-up [animation-delay:200ms]">
              <p className="text-lg md:text-3xl text-muted-foreground leading-relaxed font-normal tracking-tight">
                Modern web developer focused on React, Next.js, Node.js, and Firebase, with expertise in Google Apps Script automation to streamline and optimize business processes.
              </p>
            </div>
          </header>

          {/* Value Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-40 animate-fade-in-up [animation-delay:400ms]">
            {values.map((value, idx) => (
              <Card key={idx} className={cn(
                "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 group p-8 md:p-10 rounded-[2.5rem] overflow-hidden hover:-translate-y-2 shadow-xl",
                value.glow
              )}>
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter transition-colors group-hover:text-primary text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal tracking-tight">{value.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Card>
            ))}
          </section>

          {/* Detailed Narrative */}
          <section className="space-y-20 md:space-y-32 mb-24 md:mb-40">
            
            <div className="space-y-10 animate-fade-in-up">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit">
                <span className="flex items-center gap-3">
                  <BookOpen size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">The Narrative</span>
                </span>
              </Badge>
              <div className="space-y-8 md:space-y-12">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gradient leading-tight">
                  The Story Behind <br className="hidden sm:block" /> the Code
                </h3>
                <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-normal tracking-tight max-w-5xl">
                  <p>
                    My journey began with <strong className="text-foreground font-bold">full-stack web development</strong>, focusing on building complete web applications from intuitive frontends to reliable backends.
                  </p>
                  <p>
                    I discovered <strong className="text-foreground font-bold">Google Apps Script</strong>, enabling me to build automation solutions within <strong className="text-foreground font-bold">Google Workspace</strong> that automate data processing and internal workflows.
                  </p>
                  <p className="text-foreground font-bold italic border-l-4 border-primary pl-4 md:pl-6 py-2">
                    For me, coding is about building technology that solves real problems and makes work more efficient.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16 animate-fade-in-up">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit uppercase text-[10px] font-black tracking-widest text-primary">
                Technical Arsenal
              </Badge>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {techArsenal.map((tech) => (
                  <Card key={tech.name} className={cn(
                    "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 shadow-xl",
                    tech.glow
                  )}>
                    <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 shadow-lg group-hover:scale-110",
                          tech.color
                        )}>
                          {tech.icon}
                        </div>
                        <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground/40 bg-white/5 px-2 py-1 rounded-full border border-white/5 group-hover:text-primary transition-colors">
                          {tech.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold uppercase tracking-tighter group-hover:text-primary transition-colors text-foreground">
                        {tech.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground font-normal leading-relaxed tracking-tight mt-1">
                        {tech.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-12 md:space-y-16 animate-fade-in-up">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none text-foreground">
                  Engineering <span className="text-primary italic">Philosophy</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2rem] border-white/5 hover:border-primary/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">The Automation Mindset</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    I develop modern web applications using React, Next.js, Node.js, and Firebase while also building automation solutions with Google Apps Script to streamline business processes.
                  </p>
                </Card>

                <Card className="glass-card p-8 md:p-10 rounded-[2rem] border-white/5 hover:border-blue-400/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 mb-8">
                    <Search size={24} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">SEO Optimization</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    I build with visibility in mind. Technical SEO is woven into the architecture of every project.
                  </p>
                </Card>

                <Card className="glass-card p-8 md:p-10 rounded-[2rem] border-white/5 hover:border-purple-400/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-400 mb-8">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">Velocity & Precision</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    High-performance is about delivery speed without sacrificing quality.
                  </p>
                </Card>

                <Card className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2rem] border-white/5 flex flex-col md:flex-row items-center justify-between group overflow-hidden relative hover:border-primary/30 transition-all duration-500">
                  <div className="space-y-6 max-w-xl relative z-10">
                    <div className="flex items-center gap-3 text-primary">
                      <Sparkles size={14} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">The AI Edge</span>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground">AI-Augmented Engineering</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I integrate Large Language Models (LLMs) to create smarter applications and context-aware web interfaces.
                    </p>
                  </div>
                  <div className="h-24 w-24 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10 mt-8 md:mt-0">
                    <Cpu className="h-10 w-10" />
                  </div>
                  <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                </Card>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16 animate-fade-in-up">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit uppercase text-[10px] font-black tracking-widest text-primary">
                Academic Foundation
              </Badge>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <Card key={idx} className="glass-card border-white/5 p-8 md:p-10 rounded-[2rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="h-16 w-16 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-primary">
                        {edu.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">{edu.degree}</h3>
                          <Badge variant="outline" className="w-fit text-primary border-primary/20">
                            {edu.period}
                          </Badge>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">{edu.institution} • {edu.score}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{edu.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <section className="mt-24 md:mt-40 animate-fade-in-up">
              <div className="rounded-[2.5rem] bg-primary p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden group">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-primary-foreground uppercase leading-[0.9] md:leading-[0.8] relative z-10">
                  Ready to build <br /> the <span className="italic opacity-80">Future?</span>
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 relative z-10">
                  <Button asChild size="lg" className="rounded-full px-12 h-16 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest text-sm w-full sm:w-auto">
                    <Link href={`mailto:${profile?.contactEmail || 'ahsan000k@gmail.com'}`}>Start a Conversation</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-full px-12 h-16 border-white/20 bg-white/10 text-white hover:bg-white/20 font-black uppercase tracking-widest text-sm backdrop-blur-md w-full sm:w-auto">
                    <Link href="/#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
              </div>
            </section>

          </section>
        </div>
      </main>
    </div>
  );
}