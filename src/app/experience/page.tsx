
"use client";

import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Briefcase, Award, ArrowRight, Loader2, Sparkles, Terminal, Activity, Code2
} from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase, useCollection } from "@/firebase";
import { doc, collection, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ExperiencePage() {
  const db = useFirestore();
  const [activeOwnerId, setActiveOwnerId] = useState<string>("ahsan");

  // Discover active user
  const usersQuery = useMemoFirebase(() => query(collection(db, 'users'), limit(1)), [db]);
  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);

  useEffect(() => {
    if (users && users.length > 0) {
      setActiveOwnerId(users[0].id);
    }
  }, [users]);

  const profileRef = useMemoFirebase(() => doc(db, 'users', activeOwnerId), [db, activeOwnerId]);
  const experiencesQuery = useMemoFirebase(() => query(collection(db, 'users', activeOwnerId, 'experiences'), orderBy('order', 'desc')), [db, activeOwnerId]);
  
  const { data: profile } = useDoc(profileRef);
  const { data: experiences, isLoading: expLoading } = useCollection(experiencesQuery);

  const defaultExperiences = [
    {
      id: "exp-1",
      role: "Google Apps Script Engineer & Web Developer",
      company: "Cloudfort Technologies and Consultancy",
      period: "Nov 2024 — Present",
      desc: "Developing modern web applications using React, Next.js, and JavaScript with a focus on performance and scalability.\nCreating powerful automation systems with Google Apps Script to streamline Google Workspace operations and business processes.\nEngineering reliable, secure, and production-ready solutions for businesses and consulting projects.",
    }
  ];

  const displayExperiences = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 md:pt-48 pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
          {/* Header */}
          <header className="space-y-6 md:space-y-10 mb-20 md:mb-32 animate-fade-in-up">
            <Badge variant="secondary" className="py-2 px-6 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm w-fit">
              <span className="flex items-center gap-3">
                <Briefcase size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Professional Trajectory</span>
              </span>
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] uppercase italic text-foreground">
              Career <br className="hidden sm:block" /> <span className="text-gradient">Evolution.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-normal tracking-tight">
              A chronological overview of my professional experience, key achievements, and the technical impact I've delivered across various organizations.
            </p>
          </header>

          {/* Timeline Section */}
          <section className="relative space-y-12 md:space-y-16 animate-fade-in-up">
             {expLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <Activity className="animate-spin text-primary h-10 w-10" />
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Syncing career records...</p>
                </div>
             ) : (
               <div className="relative space-y-8 max-w-5xl">
                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />
                {displayExperiences.map((exp: any, idx) => (
                  <div key={exp.id || idx} className="relative pl-24 md:pl-32 group animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className="absolute left-[1.125rem] md:left-[2.125rem] top-1 z-10 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)] ring-4 ring-background group-hover:scale-125 transition-transform duration-500" />
                    </div>
                    <Card className="glass-card border-white/5 p-8 md:p-12 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Award size={120} />
                      </div>
                      <div className="flex flex-col gap-8 relative z-10">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors leading-tight">{exp.role}</h3>
                              <p className="text-base md:text-xl font-bold uppercase tracking-widest text-primary">{exp.company}</p>
                            </div>
                            <Badge variant="outline" className="w-fit text-primary border-primary/20 bg-primary/5 py-2 px-6 text-xs font-bold uppercase tracking-widest h-fit">
                              {exp.period}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-6 max-w-4xl">
                          {exp.desc?.split('\n').map((point: string, pIdx: number) => (
                            <div key={pIdx} className="flex gap-4 text-base md:text-lg text-muted-foreground leading-relaxed font-normal tracking-tight">
                              <div className="h-2 w-2 rounded-full bg-primary/40 mt-2 shrink-0" />
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
             )}
          </section>

          {/* Core Competencies Brief */}
          <section className="mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            <Card className="glass-card p-10 md:p-16 rounded-[3rem] border-white/5 space-y-8 group">
               <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <Code2 size={32} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Web Development</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Developing modern web applications using React, Next.js, and JavaScript with a focus on performance and scalability. Engineering reliable, secure, and production-ready solutions.
                  </p>
               </div>
            </Card>
            <Card className="glass-card p-10 md:p-16 rounded-[3rem] border-white/5 space-y-8 group">
               <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20 group-hover:scale-110 transition-transform">
                  <Terminal size={32} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Process Automation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Creating powerful automation systems with Google Apps Script to streamline Google Workspace operations and business processes for maximum efficiency.
                  </p>
               </div>
            </Card>
          </section>

          {/* CTA */}
          <section className="mt-32 md:mt-48 animate-fade-in-up">
            <div className="rounded-[2.5rem] bg-primary p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden group">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-primary-foreground uppercase leading-[0.9] md:leading-[0.8] relative z-10">
                Let's discuss <br /> the <span className="italic opacity-80">Next Chapter.</span>
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 relative z-10">
                <Button asChild size="lg" className="rounded-full px-12 h-16 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest text-sm w-full sm:w-auto">
                  <Link href={`mailto:${profile?.contactEmail || 'ahsan000k@gmail.com'}`}>Start a Conversation</Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-full px-12 h-16 border-white/20 bg-white/10 text-white hover:bg-white/20 font-black uppercase tracking-widest text-sm backdrop-blur-md w-full sm:w-auto">
                  <Link href="/hire">Hire My Expertise <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
