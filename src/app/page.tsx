import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/app/lib/projects";
import { ArrowRight, Code2, Cpu, Globe, Sparkles, Terminal, Database, Layers, Mail } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const techStack = [
    { name: "Next.js", icon: <Layers size={16} /> },
    { name: "TypeScript", icon: <Code2 size={16} /> },
    { name: "Firebase", icon: <Database size={16} /> },
    { name: "GenAI", icon: <Sparkles size={16} /> },
    { name: "Tailwind", icon: <Globe size={16} /> },
    { name: "Python", icon: <Terminal size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern mesh-gradient overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-8 py-1.5 px-4 rounded-full border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </span>
          </Badge>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl leading-[0.9] animate-fade-in-up">
            Building the next generation of <span className="text-gradient">AI-First</span> software.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
            Senior Full-Stack Engineer specializing in LLM orchestration, 
            production-grade RAG pipelines, and high-performance web architecture.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20 animate-fade-in-up [animation-delay:400ms]">
            <Link 
              href="/#projects" 
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              View My Work <ArrowRight size={20} />
            </Link>
            <Link 
              href="/hire" 
              className="glass-card px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Consulting Services
            </Link>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl animate-fade-in-up [animation-delay:600ms]">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium">
                <span className="text-primary">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground">A selection of my latest work in AI and Web Engineering.</p>
            </div>
            <Link href="#" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Browse all projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Approach */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Engineering with <br /><span className="text-primary">Business Value</span> in mind.</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I don't just write code. I architect solutions that solve real-world operational 
                  challenges. Whether it's reducing churn with AI agents or optimizing legacy 
                  pipelines, my focus is on measurable ROI.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-bold text-white">40%+</p>
                    <p className="text-sm text-muted-foreground">Avg. Operational Savings</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">100+</p>
                    <p className="text-sm text-muted-foreground">Production Deploys</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "RAG Specialization", desc: "Expert at building context-aware retrieval systems with Vector DBs.", icon: <Sparkles className="text-primary" /> },
                  { title: "Cloud Native", desc: "Scaling serverless architecture on GCP, AWS, and Azure.", icon: <Globe className="text-blue-400" /> },
                  { title: "Full Stack Mastery", desc: "Crafting pixel-perfect UIs and robust distributed backends.", icon: <Cpu className="text-purple-400" /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-6 items-start">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight italic">Ready to build something <span className="text-primary">extraordinary</span>?</h2>
            <p className="text-muted-foreground text-lg">
              Let's discuss how AI and modern web technologies can transform your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/hire" 
                className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
              >
                Let's Talk
              </Link>
              <Link 
                href="mailto:hello@dev.io" 
                className="glass-card px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Mail size={20} /> Email Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-[10px] font-bold text-white">
              <Code2 size={12} />
            </div>
            <span className="font-bold text-sm">DevPort // 2024</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
