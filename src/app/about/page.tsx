"use client";

import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, BrainCircuit, Zap, ShieldCheck, Heart, 
  Globe, Coffee, Rocket, Mail, ChevronRight,
  Code2, Cpu, Database, Flame, Layers, Share2, 
  Terminal, Palette, Sparkles, BookOpen, Map, Hammer
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

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-48">
          {/* Header */}
          <header className="space-y-10 mb-32 animate-fade-in-up">
            <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                <User size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Engineering Philosophy</span>
              </span>
            </Badge>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
              Solving with <br /> <span className="text-gradient">precision.</span>
            </h1>
            <div className="space-y-6 max-w-4xl animate-fade-in-up [animation-delay:200ms]">
              <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light">
                {profile?.bio || "Modern web developer focused on React, Next.js, Node.js, and Firebase, with expertise in Google Apps Script automation to streamline and optimize business processes."}
              </p>
              <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light">
                I build scalable, high-performance applications and automation solutions that improve workflows, enhance productivity, and deliver seamless user experiences.
              </p>
            </div>
          </header>

          {/* Value Cards */}
          <section className="grid md:grid-cols-3 gap-6 mb-40">
            {values.map((value, idx) => (
              <Card key={idx} className={cn(
                "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 group p-10 rounded-[3rem] bg-white/[0.02] overflow-hidden hover:-translate-y-2 shadow-xl",
                value.glow
              )}>
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter transition-colors group-hover:text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{value.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Card>
            ))}
          </section>

          {/* Detailed Narrative & Journey */}
          <section className="space-y-32 mb-40">
            
            {/* The Narrative Section */}
            <div className="space-y-10">
              <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit">
                <span className="flex items-center gap-3">
                  <BookOpen size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">The Narrative</span>
                </span>
              </Badge>
              <div className="space-y-12">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-gradient leading-tight">
                  The Story Behind <br /> the Code
                </h3>
                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-light max-w-5xl">
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
                  <p className="text-foreground font-bold italic border-l-4 border-primary pl-6 py-2">
                    For me, coding is about building technology that solves real problems and makes work more efficient.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Section (Integrated) */}
            <div className="space-y-16">
              <div className="space-y-8 max-w-5xl">
                {/* Beyond the Desk */}
                <Card className="glass-card p-12 rounded-[4rem] border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart size={160} />
                  </div>
                  <h3 className="text-3xl font-black mb-10 relative z-10 uppercase tracking-tighter">Beyond <br />the Desk</h3>
                  <ul className="grid sm:grid-cols-3 gap-10 relative z-10">
                    {[
                      { icon: <Globe />, title: "Digital Nomad", desc: "Passionate about working from diverse environments." },
                      { icon: <Coffee />, title: "Coffee Enthusiast", desc: "Always hunting for the perfect specialty roast." },
                      { icon: <Rocket />, title: "Tech Mentor", desc: "Helping the next generation of engineers grow." }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-6 group/item">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-black text-foreground uppercase tracking-widest text-xs">{item.title}</p>
                          <p className="text-sm text-muted-foreground font-light mt-1">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Inquiries */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/20">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Inquiries</p>
                        <p className="font-black text-lg">{profile?.contactEmail || "hello@alexrivera.dev"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 rounded-[3rem] border border-white/5 bg-white/5 flex items-center justify-center group hover:bg-primary transition-all">
                     <p className="text-xs font-black uppercase tracking-[0.3em] group-hover:text-white">Let's build together.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Arsenal Section */}
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
                    "glass-card border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2.5rem] bg-white/[0.02] overflow-hidden group hover:-translate-y-2 shadow-xl",
                    tech.glow
                  )}>
                    <CardContent className="p-8 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start mb-10">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:bg-white/10",
                          tech.color
                        )}>
                          {tech.icon}
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                          {tech.category}
                        </span>
                      </div>
                      
                      <div className="mt-auto space-y-2">
                        <h4 className="text-xl font-bold uppercase tracking-tighter group-hover:text-primary transition-colors">
                          {tech.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground font-light leading-relaxed tracking-tight">
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
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.5em] opacity-30">
          Engineering with empathy & performance.
        </p>
      </footer>
    </div>
  );
}