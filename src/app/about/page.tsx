'use client';

import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, Code2, BrainCircuit, Rocket, Heart, 
  Coffee, Globe, Zap, ShieldCheck, Sparkles 
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
      desc: "Every millisecond counts. I architect systems that are fast by default, ensuring optimal user experiences and SEO performance." 
    },
    { 
      icon: <ShieldCheck className="text-green-400" />, 
      title: "Production Ready", 
      desc: "Code is a liability until it's in production. I focus on clean, tested, and maintainable software that solves real business problems." 
    },
    { 
      icon: <BrainCircuit className="text-primary" />, 
      title: "AI Native", 
      desc: "Artificial Intelligence isn't just a feature; it's a paradigm shift. I integrate LLMs and automation into core workflows to unlock new possibilities." 
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden">
      <Navigation />
      
      <main className="pt-48 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Hero Section */}
          <header className="space-y-8 mb-24 animate-fade-in-up">
            <Badge variant="secondary" className="py-1.5 px-4 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <User size={14} className="text-primary" />
                The Engineer Behind the Code
              </span>
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Solving problems with <span className="text-gradient">precision</span> and <span className="text-gradient">purpose</span>.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {profile?.bio || "I am a Senior Software Engineer and AI Architect dedicated to building high-impact digital products. With over a decade of experience across the stack, I blend technical mastery with a deep understanding of business objectives."}
            </p>
          </header>

          {/* Philosophy Section */}
          <section className="grid md:grid-cols-3 gap-8 mb-32">
            {values.map((value, idx) => (
              <Card key={idx} className="glass-card border-white/5 hover:border-primary/20 transition-all group p-8 rounded-[2rem]">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </section>

          {/* Detailed Bio / Background */}
          <section className="grid lg:grid-cols-12 gap-16 items-start mb-32">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-4">
                  <div className="h-1 w-12 bg-primary rounded-full" />
                  My Journey
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I started my career building small-scale web applications, but my passion for performance and scalability quickly led me to enterprise-level architecture. Over the years, I've worked with startups and global leaders to modernize their tech stacks.
                  </p>
                  <p>
                    Today, my focus is at the intersection of <strong>Full-Stack Development</strong> and <strong>Generative AI</strong>. I believe the most successful products are those that leverage intelligent automation to augment human creativity, not replace it.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-4">
                  <div className="h-1 w-12 bg-accent rounded-full" />
                  Technical Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Next.js", "React", "TypeScript", "Node.js", "Genkit", "PostgreSQL", "Google Cloud", "Firebase", "Tailwind"].map(tech => (
                    <div key={tech} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold uppercase tracking-wider">
                      <Sparkles size={14} className="text-primary" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-8 sticky top-32">
              <Card className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart size={120} />
                </div>
                <h3 className="text-2xl font-black mb-6 relative z-10">Beyond the Code</h3>
                <ul className="space-y-6 relative z-10 text-muted-foreground">
                  <li className="flex gap-4">
                    <Globe className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Digital Nomad</p>
                      <p className="text-sm">Passionate about exploring new cultures and working from diverse environments.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Coffee className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Coffee Enthusiast</p>
                      <p className="text-sm">Always hunting for the perfect specialty brew and the best local roasters.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Rocket className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Tech Mentor</p>
                      <p className="text-sm">Contributing to open-source and helping the next generation of engineers grow.</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Inquiries</p>
                    <p className="font-bold">{profile?.contactEmail || "hello@alexrivera.dev"}</p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.4em]">
            Engineering with empathy & performance.
          </p>
        </div>
      </footer>
    </div>
  );
}
