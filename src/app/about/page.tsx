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
  GraduationCap, School, Calendar, Award, ArrowRight
} from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

const OWNER_ID = "alex-rivera";

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
      desc: "Studied computer science fundamentals including programming, software development, database management, and web technologies. Developed practical skills in full-stack development and problem solving through academic and project work.",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      degree: "Intermediate (Class XII)",
      institution: "Pioneer Montessori Inter College",
      period: "2019",
      score: "PERCENTAGE: 71%",
      desc: "Completed higher secondary education with focus on core academic subjects while developing strong analytical and problem-solving skills.",
      icon: <School className="h-6 w-6" />
    },
    {
      degree: "High School (Class X)",
      institution: "Pioneer Montessori High School",
      period: "2017",
      score: "PERCENTAGE: 87%",
      desc: "Successfully completed secondary education with a focus on science and mathematics, fostering early analytical and problem-solving skills.",
      icon: <School className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          {/* Header */}
          <header className="space-y-6 md:space-y-10 mb-20 md:mb-32 animate-fade-in-up">
            <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                <User size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Engineering Philosophy</span>
              </span>
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] uppercase italic">
              Solving with <br className="hidden sm:block" /> <span className="text-gradient">precision.</span>
            </h1>
            <div className="space-y-4 md:space-y-6 max-w-4xl animate-fade-in-up [animation-delay:200ms]">
              <p className="text-lg md:text-3xl text-muted-foreground leading-relaxed font-light">
                Modern web developer focused on React, Next.js, Node.js, and Firebase, with expertise in Google Apps Script automation to streamline and optimize business processes.
              </p>
              <p className="text-lg md:text-3xl text-muted-foreground leading-relaxed font-light">
                I build scalable, high-performance applications and automation solutions that improve workflows, enhance productivity, and deliver seamless user experiences.
              </p>
            </div>
          </header>

          {/* Value Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-40">
            {values.map((value, idx) => (
              <Card key={idx} className={cn(
                "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.02] overflow-hidden hover:-translate-y-2 shadow-xl",
                value.glow
              )}>
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter transition-colors group-hover:text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{value.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Card>
            ))}
          </section>

          {/* Detailed Narrative */}
          <section className="space-y-20 md:space-y-32 mb-24 md:mb-40">
            
            <div className="space-y-10">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit">
                <span className="flex items-center gap-3">
                  <BookOpen size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">The Narrative</span>
                </span>
              </Badge>
              <div className="space-y-8 md:space-y-12">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gradient leading-tight">
                  The Story Behind <br className="hidden sm:block" /> the Code
                </h3>
                <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-5xl">
                  <p>
                    My journey into technology began with <strong className="text-foreground font-bold">full-stack web development</strong>, where I focused on building complete web applications—from intuitive frontend interfaces to reliable backend systems. Using modern technologies, I created responsive user experiences, managed databases, and developed scalable APIs that support real-world products.
                  </p>
                  <p>
                    While working on web projects, I became interested in <strong className="text-foreground font-bold">improving workflows and reducing repetitive manual tasks</strong> that slow down teams and business operations. This curiosity led me to explore <strong className="text-foreground font-bold">workflow automation</strong> and smarter ways to streamline everyday processes.
                  </p>
                  <p>
                    During this journey, I discovered <strong className="text-foreground font-bold">Google Apps Script</strong>, which allowed me to build automation solutions within <strong className="text-foreground font-bold">Google Workspace</strong>. By integrating tools like <strong className="text-foreground font-bold">Google Sheets</strong>, <strong className="text-foreground font-bold">Google Forms</strong>, and <strong className="text-foreground font-bold">Gmail</strong>, I created <strong className="text-foreground font-bold">Google Workspace workflow automation systems</strong> that automate data processing, reporting, notifications, and internal workflows.
                  </p>
                  <p>
                    Today, I combine <strong className="text-foreground font-bold">modern web development with workflow automation</strong> to build scalable applications and efficient systems that simplify complex processes, reduce manual work, and improve productivity.
                  </p>
                  <p className="text-foreground font-bold italic border-l-4 border-primary pl-4 md:pl-6 py-2">
                    For me, coding is about building technology that solves real problems and makes work more efficient.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit uppercase text-[10px] font-black tracking-widest text-primary">
                  The Journey
                </Badge>
              </div>
              <div className="space-y-6 md:space-y-8 max-w-5xl">
                <Card className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                    <Heart size={160} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-10 relative z-10 uppercase tracking-tighter">Beyond <br className="hidden sm:block" />the Desk</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 relative z-10">
                    {[
                      { icon: <Globe />, title: "Digital Nomad", desc: "Passionate about working from diverse environments." },
                      { icon: <Coffee />, title: "Coffee Enthusiast", desc: "Always hunting for the perfect specialty roast." },
                      { icon: <Rocket />, title: "Tech Mentor", desc: "Helping the next generation of engineers grow." }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-4 md:gap-6 group/item">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-black text-foreground uppercase tracking-widest text-xs">{item.title}</p>
                          <p className="text-xs md:text-sm text-muted-foreground font-light mt-1">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-center justify-between p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/20">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
                        <Mail className="h-[18px] w-[18px] md:h-5 md:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Inquiries</p>
                        <p className="font-black text-sm md:text-lg truncate">{profile?.contactEmail || "hello@alexrivera.dev"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-white/5 flex items-center justify-center group hover:bg-primary transition-all text-center">
                     <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Let's build together.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit">
                <span className="flex items-center gap-3">
                  <Hammer size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Technical Arsenal</span>
                </span>
              </Badge>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {techArsenal.map((tech) => (
                  <Card key={tech.name} className={cn(
                    "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] overflow-hidden group hover:-translate-y-2 shadow-xl",
                    tech.glow
                  )}>
                    <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start mb-8 md:mb-10">
                        <div className={cn(
                          "h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:bg-white/10",
                          tech.color
                        )}>
                          {tech.icon}
                        </div>
                        <span className="text-[8px] md:text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                          {tech.category}
                        </span>
                      </div>
                      
                      <div className="mt-auto space-y-1 md:space-y-2">
                        <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter group-hover:text-primary transition-colors">
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

            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                  Engineering <span className="text-primary italic">Philosophy</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-light">
                  My approach to building software that lasts and empowers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 hover:border-primary/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 md:mb-10">
                    <Layers size={24} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">The Automation Mindset</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                      I develop modern web applications using React, Next.js, Node.js, and Firebase while also building automation solutions with Google Apps Script to streamline business processes and improve productivity.
                    </p>
                  </div>
                </Card>

                <Card className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 hover:border-blue-400/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 mb-8 md:mb-10">
                    <Search size={24} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">SEO Optimization</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                      I build with visibility in mind. Technical SEO isn't an afterthought—it's woven into the architecture of every project.
                    </p>
                  </div>
                </Card>

                <Card className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 hover:border-purple-400/30 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-400 mb-8 md:mb-10">
                    <Zap size={24} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Velocity & Precision</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                      High-performance isn't just about code speed—it's about delivery speed without sacrificing quality.
                    </p>
                  </div>
                </Card>

                <Card className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between group overflow-hidden relative hover:border-primary/30 transition-all duration-500">
                  <div className="space-y-6 max-w-xl relative z-10 mb-8 md:mb-0">
                    <div className="flex items-center gap-3 text-primary">
                      <Sparkles size={14} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">The AI Edge</span>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">AI-Augmented Engineering</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                        I integrate Large Language Models (LLMs) to create smarter applications—from automated data analysis in spreadsheets to intelligent, context-aware web interfaces.
                      </p>
                    </div>
                  </div>
                  <div className="flex h-24 w-24 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-full bg-primary/5 border border-primary/10 relative z-10 group-hover:scale-110 transition-transform duration-500">
                     <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Cpu className="h-8 w-8 md:h-10 md:w-10" />
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                </Card>
              </div>
            </div>

            {/* Educational Journey Section */}
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit uppercase text-[10px] font-black tracking-widest text-primary">
                  Academic Foundation
                </Badge>
                <div className="space-y-4">
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                    Educational <span className="text-primary italic">Journey</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
                    Building the core principles of computer science and analytical thinking.
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                {education.map((edu, idx) => (
                  <Card key={idx} className="glass-card border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                      <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-full bg-white/5 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <div className="text-primary">
                          {edu.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4 md:space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-xl md:text-3xl font-black tracking-tighter uppercase leading-tight">{edu.degree}</h3>
                            <div className="flex items-center gap-2 text-primary font-bold uppercase text-[9px] md:text-[10px] tracking-widest">
                              <School className="h-3 w-3" />
                              {edu.institution}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="rounded-full bg-primary/5 border-primary/20 text-primary text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 py-1 gap-2 whitespace-nowrap">
                              <Calendar className="h-2.5 w-2.5" /> {edu.period}
                            </Badge>
                            <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-foreground text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 py-1 whitespace-nowrap">
                              {edu.score}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light max-w-4xl">
                          {edu.desc}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <section className="mt-24 md:mt-40">
              <div className="rounded-[2.5rem] md:rounded-[4rem] bg-primary p-12 md:p-24 text-center space-y-10 md:space-y-12 shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="space-y-4 relative z-10">
                  <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-primary-foreground uppercase leading-[0.9] md:leading-[0.8] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Ready to build <br /> the <span className="italic opacity-80">Future?</span>
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 relative z-10 w-full sm:w-auto">
                  <Button asChild size="lg" className="rounded-full px-12 h-16 md:h-20 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest text-sm shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                    <Link href={`mailto:${profile?.contactEmail || 'hello@alexrivera.dev'}`}>Start a Conversation</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-full px-12 h-16 md:h-20 border-white/20 bg-white/10 text-white hover:bg-white/20 font-black uppercase tracking-widest text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                    <Link href="/#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000 hidden md:block" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/20 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000 hidden md:block" />
              </div>
            </section>

          </section>
        </div>
      </main>
    </div>
  );
}
