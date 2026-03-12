"use client";

import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { 
  ArrowRight, Github, Mail, Linkedin, Code2,
  Zap, ShieldCheck, Flame, Palette,
  Activity, Target, Terminal, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { client, PROJECTS_QUERY, isSanityConfigured } from "@/lib/sanity";

export default function Home() {
  const db = useFirestore();
  const [sanityProjects, setSanityProjects] = useState<any[]>([]);
  const [isSanityLoading, setIsSanityLoading] = useState(true);

  // Still use Firestore for the user profile
  const profileRef = useMemoFirebase(() => doc(db, 'users', 'ahsan'), [db]);
  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function fetchProjects() {
      if (!isSanityConfigured) {
        setIsSanityLoading(false);
        return;
      }
      
      try {
        const projects = await client.fetch(PROJECTS_QUERY);
        setSanityProjects(projects || []);
      } catch (error) {
        console.error("Sanity connection error:", error);
        // Fallback to empty to stop loading state
        setSanityProjects([]);
      } finally {
        setIsSanityLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
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
            {profile?.headline || "Software Engineer specializing in building scalable digital systems and intelligent automation workflows."}
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
            <Link href={`mailto:${profile?.contactEmail || 'ahsan000k@gmail.com'}`} className="hover:text-primary hover:opacity-100 transition-all hover:scale-110"><Mail size={24} /></Link>
          </div>
        </div>
      </section>

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

      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48 animate-fade-in-up">
          <div className="mb-12 md:mb-20 max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-6xl font-bold tracking-tight leading-none italic uppercase text-foreground">
              Proven results in <span className="text-muted-foreground">engineering.</span>
            </h3>
          </div>
          
          {isSanityLoading ? (
             <div className="py-20 flex flex-col items-center gap-4">
               <Activity className="animate-spin text-primary h-8 w-8" />
               <p className="text-muted-foreground italic text-xs uppercase tracking-widest">Fetching from Sanity...</p>
             </div>
          ) : !isSanityConfigured ? (
            <div className="py-20 border border-dashed border-white/10 rounded-[2rem] text-center max-w-2xl mx-auto space-y-6">
               <AlertCircle className="mx-auto h-12 w-12 text-yellow-500/50" />
               <div className="space-y-2">
                 <h4 className="text-xl font-bold uppercase tracking-tighter">Sanity Configuration Required</h4>
                 <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Please ensure your Sanity Project ID (<strong>61no71y9</strong>) is correctly configured.
                 </p>
               </div>
               <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/cms">View Setup Guide</Link>
               </Button>
            </div>
          ) : sanityProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sanityProjects.map((project, idx) => (
                <ProjectCard 
                  key={project._id} 
                  project={{
                    id: project._id,
                    slug: project.slug,
                    title: project.title,
                    description: project.shortDescription,
                    imageUrl: project.imageUrl,
                    techStack: project.technologies,
                    roiMetric: project.featured ? "Featured Project" : ""
                  }} 
                  index={idx} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 border border-dashed border-white/10 rounded-[2rem] text-center">
              <p className="text-muted-foreground italic">No projects found in Sanity. Add some to get started.</p>
              <p className="text-[10px] text-muted-foreground/50 mt-2 uppercase tracking-widest">Note: Ensure projects are "Published" in the Studio.</p>
            </div>
          )}
        </div>
      </section>

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
