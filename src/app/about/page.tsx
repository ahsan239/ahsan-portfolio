"use client";

import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, Code2, BrainCircuit, Rocket, Heart, 
  Coffee, Globe, Zap, ShieldCheck, Sparkles, Mail, ChevronRight
} from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

const OWNER_ID = "alex-rivera";

export default function AboutPage() {
  const db = useFirestore();
  const profileRef = useMemoFirebase(() => doc(db, 'users', OWNER_ID), [db]);
  const { data: profile } = useDoc(profileRef);

  const values = [
    { 
      icon: <Zap className="text-yellow-400" />, 
      title: "Performance First", 
      desc: "Every millisecond counts. I architect systems that are fast by default, ensuring optimal user experiences." 
    },
    { 
      icon: <ShieldCheck className="text-green-400" />, 
      title: "Production Ready", 
      desc: "Code is a liability until it's in production. I focus on tested, maintainable software." 
    },
    { 
      icon: <BrainCircuit className="text-primary" />, 
      title: "AI Native", 
      desc: "Integrating LLMs and automation into core workflows to unlock new digital possibilities." 
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">
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
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl font-light">
              {profile?.bio || "I develop modern web applications using React, Next.js, Node.js, and Firebase while also building automation solutions with Google Apps Script to streamline business processes and improve productivity."}
            </p>
          </header>

          {/* Value Cards */}
          <section className="grid md:grid-cols-3 gap-6 mb-40">
            {values.map((value, idx) => (
              <Card key={idx} className="glass-card border-white/5 hover:border-primary/20 transition-all group p-10 rounded-[3rem]">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{value.desc}</p>
              </Card>
            ))}
          </section>

          {/* Detailed Journey */}
          <section className="grid lg:grid-cols-12 gap-24 items-start mb-40">
            <div className="lg:col-span-7 space-y-20">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">01</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">My Journey</h2>
                </div>
                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-light">
                  <p>
                    I started my career building small-scale web applications, but my passion for performance and scalability quickly led me to enterprise-level architecture.
                  </p>
                  <p>
                    Today, my focus is at the intersection of <strong className="text-foreground font-bold underline decoration-primary/30">Full-Stack Development</strong> and <strong className="text-foreground font-bold underline decoration-primary/30">Generative AI</strong>. I believe the most successful products are those that leverage intelligent automation to augment human creativity.
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">02</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Stack</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Next.js", "React", "TypeScript", "Node.js", "Genkit", "PostgreSQL", "Google Cloud", "Firebase", "Tailwind"].map(tech => (
                    <div key={tech} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-primary/50 transition-all group">
                      {tech}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-8 sticky top-32">
              <Card className="glass-card p-12 rounded-[4rem] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Heart size={160} />
                </div>
                <h3 className="text-3xl font-black mb-10 relative z-10 uppercase tracking-tighter">Beyond <br />the Desk</h3>
                <ul className="space-y-10 relative z-10">
                  {[
                    { icon: <Globe />, title: "Digital Nomad", desc: "Passionate about working from diverse environments." },
                    { icon: <Coffee />, title: "Coffee Enthusiast", desc: "Always hunting for the perfect specialty roast." },
                    { icon: <Rocket />, title: "Tech Mentor", desc: "Helping the next generation of engineers grow." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 group/item">
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
            </aside>
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
