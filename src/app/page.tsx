
'use client';

import { useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { 
  ArrowRight, Code2, Database, Layers, Mail, Github, 
  Linkedin, Briefcase, GraduationCap, User, Star, Terminal, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

const OWNER_ID = "alex-rivera"; // Fixed ID for the portfolio owner

export default function Home() {
  const db = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'users', OWNER_ID, 'projects'), orderBy('order', 'asc'));
  }, [db]);

  const experiencesQuery = useMemoFirebase(() => {
    return query(collection(db, 'users', OWNER_ID, 'experiences'), orderBy('order', 'desc'));
  }, [db]);

  const { data: projects, isLoading: projectsLoading } = useCollection(projectsQuery);
  const { data: experiences, isLoading: experiencesLoading } = useCollection(experiencesQuery);

  const techStack = [
    { name: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"], icon: <Layers size={18} /> },
    { name: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "Redis"], icon: <Database size={18} /> },
    { name: "AI/ML", skills: ["Genkit", "LLMs", "RAG Pipelines", "Vector DBs"], icon: <Sparkles size={18} /> },
    { name: "DevOps", skills: ["GCP", "Docker", "CI/CD", "Terraform"], icon: <Terminal size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-8 py-1.5 px-4 rounded-full border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for strategic engineering roles
            </span>
          </Badge>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl leading-[0.9] animate-fade-in-up">
            Shipping code that <span className="text-gradient">scales</span> with impact.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
            Senior Software Engineer & AI Architect. I build robust digital products 
            using modern web technologies and intelligent automation systems.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-24 animate-fade-in-up [animation-delay:400ms]">
            <Button asChild size="lg" className="rounded-xl px-8 h-14 font-bold shadow-xl shadow-primary/20">
              <Link href="/#projects">View Projects <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="glass-card rounded-xl px-8 h-14 font-bold border-white/10">
              <Link href="/hire">Work with Me</Link>
            </Button>
          </div>

          <div className="flex items-center gap-8 opacity-40 animate-fade-in-up [animation-delay:600ms]">
            <Link href="https://github.com" className="hover:text-primary transition-colors"><Github size={24} /></Link>
            <Link href="https://linkedin.com" className="hover:text-primary transition-colors"><Linkedin size={24} /></Link>
            <Link href="mailto:hello@alexrivera.dev" className="hover:text-primary transition-colors"><Mail size={24} /></Link>
          </div>
        </div>
      </section>

      {/* About & Expertise */}
      <section id="about" className="py-24 relative bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <User size={14} /> About Me
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Full-Stack Craftsmanship <br />meets <span className="text-primary">AI Innovation.</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Alex, a software engineer obsessed with the intersection of elegant UI and powerful, 
                scalable backends. With a decade of experience in the industry, I help companies 
                modernize their stack and implement practical AI solutions that drive real results.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="p-4 rounded-2xl glass-card border-white/5">
                    <p className="text-2xl font-bold">10+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Years Experience</p>
                 </div>
                 <div className="p-4 rounded-2xl glass-card border-white/5">
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Projects Shipped</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStack.map((category) => (
                <Card key={category.name} className="glass-card border-white/10 hover:border-primary/30 transition-all group">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <span key={skill} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-white/5 rounded border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <Briefcase size={14} /> Projects
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Proof of <span className="text-primary">Engineering</span></h2>
              <p className="text-muted-foreground max-w-xl">A curated selection of complex systems I've architected and deployed recently.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading ? (
               <p className="text-muted-foreground italic">Initializing project gallery...</p>
            ) : projects && projects.length > 0 ? (
              projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project as any} index={idx} />
              ))
            ) : (
              <p className="text-muted-foreground italic">No projects found. Add them in the CMS.</p>
            )}
          </div>
        </div>
      </section>

      {/* Career Path */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                <GraduationCap size={14} /> Career Path
              </div>
              <h2 className="text-4xl font-bold">The Professional <span className="text-primary">Journey</span></h2>
            </div>

            <div className="space-y-8">
              {experiencesLoading ? (
                <p className="text-center text-muted-foreground">Loading experience timeline...</p>
              ) : experiences && experiences.length > 0 ? (
                experiences.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-12 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[1px] before:bg-white/10 last:before:hidden">
                    <div className="absolute left-0 top-2 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="glass-card p-8 rounded-3xl border-white/5 hover:border-white/10 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit h-7 border-white/10 text-muted-foreground">{exp.period}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">{exp.desc}</p>
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

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: "Sarah Chen", role: "CTO @ Nexus", content: "Alex is a rare talent who deeply understands both the business requirements and the technical complexity of modern apps." },
               { name: "John Miller", role: "Product Manager @ Streamline", content: "The level of engineering polish Alex brings to every project is unmatched. He doesn't just ship; he crafts." },
               { name: "Elena Rodriguez", role: "Founder @ AI Labs", content: "Our RAG implementation went from a prototype to a production-ready system in weeks thanks to Alex's expertise." }
             ].map((t, idx) => (
               <div key={idx} className="p-8 rounded-3xl glass-card border-white/5 space-y-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-primary text-primary" />)}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"{t.content}"</p>
                  <div className="pt-6 border-t border-white/5">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1] italic">
              Let's engineer the <span className="text-primary">future</span> together.
            </h2>
            <p className="text-xl text-muted-foreground">
              Currently accepting select consulting engagements and full-time leadership opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl px-10 h-16 font-bold text-lg">
                <Link href="mailto:hello@alexrivera.dev">Send an Email <Mail size={20} className="ml-2" /></Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="glass-card rounded-xl px-10 h-16 font-bold text-lg border-white/10">
                <Link href="/hire">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              <Code2 size={16} />
            </div>
            <span className="font-bold tracking-tight">ALEX // DEV</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">© 2024 Built with Next.js 15, Genkit & Firestore.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="/cms" className="text-sm text-primary hover:underline transition-colors font-bold">CMS Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
