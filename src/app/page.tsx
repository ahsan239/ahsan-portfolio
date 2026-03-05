import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/app/lib/projects";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database, Code2, Cpu, Globe, BrainCircuit, Sparkles, MoveDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-background">
        {/* Animated Background Elements */}
        <div className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-accent/15 blur-[120px] rounded-full animate-pulse-glow [animation-delay:2s]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Next-Gen AI Engineering
              </div>
              
              <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.95] tracking-tight">
                Architecting <br />
                <span className="text-gradient">Intelligent</span> <br />
                Foundations.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-light">
                Specializing in production-grade LLM pipelines, autonomous agents, and cost-optimized AI infrastructure that scales with your ambition.
              </p>
              
              <div className="flex flex-wrap gap-5 pt-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 rounded-full font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:scale-105">
                  <Link href="/#projects">Explore Lab <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 px-10 rounded-full font-bold backdrop-blur-sm transition-all hover:scale-105">
                  Book Strategy
                </Button>
              </div>

              <div className="pt-12 flex items-center gap-8 border-t border-white/5 max-w-md">
                <div className="space-y-1">
                  <p className="text-3xl font-black text-white">40%+</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Avg. Efficiency Gain</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="space-y-1">
                  <p className="text-3xl font-black text-white">$1.2M</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Cost Savings Delivered</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative hidden lg:block perspective-1000">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl animate-float preserve-3d transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-12">
                <Image
                  src="https://picsum.photos/seed/hero-3d/600/800"
                  alt="AI Engineer"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="futuristic portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-3xl border-t border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
                    <p className="text-xs font-black uppercase tracking-widest text-accent">Active Protocol</p>
                  </div>
                  <p className="text-lg font-bold text-white leading-tight">Optimizing Enterprise RAG for Fortune 500 Financials</p>
                </div>
              </div>
              
              {/* Decorative 3D elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Discover Work</span>
          <MoveDown className="h-4 w-4" />
        </div>
      </section>

      {/* Tech Ticker - Modernized */}
      <section className="py-20 border-y border-white/5 bg-black/50 backdrop-blur-md overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-3 text-sm font-bold tracking-tighter"><Cpu className="h-6 w-6 text-primary" /> OPENAI</div>
             <div className="flex items-center gap-3 text-sm font-bold tracking-tighter"><Code2 className="h-6 w-6 text-accent" /> LANGCHAIN</div>
             <div className="flex items-center gap-3 text-sm font-bold tracking-tighter"><Database className="h-6 w-6 text-primary" /> PINECONE</div>
             <div className="flex items-center gap-3 text-sm font-bold tracking-tighter"><Globe className="h-6 w-6 text-accent" /> AWS GENAI</div>
             <div className="flex items-center gap-3 text-sm font-bold tracking-tighter"><Code2 className="h-6 w-6 text-primary" /> PYTORCH</div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-7xl font-headline font-black mb-8 leading-tight">
              High-Impact <span className="text-gradient">Deployments</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Each project represents a strategic pivot from manual friction to autonomous efficiency. 
              Built for production, measured by ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative glass-card p-16 md:p-24 rounded-[3.5rem] border-white/10 text-center space-y-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] -ml-32 -mb-32" />
              
              <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tight max-w-4xl mx-auto">
                Ready to Automate <br className="hidden md:block" /> Your Competitive Edge?
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                I help enterprises navigate the transition to AI-native workflows through technical excellence and business strategy.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center pt-6">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-12 h-16 rounded-full font-black text-lg transition-transform hover:scale-105 shadow-2xl">
                  <Link href="/hire">Book Discovery Call</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10 px-12 h-16 rounded-full font-black text-lg backdrop-blur-md transition-transform hover:scale-105">
                  <Link href="mailto:hello@aisolutions.me">Direct Message</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-accent" />
              </div>
              <span className="font-headline font-black text-2xl tracking-tighter">AI SOLUTIONS</span>
            </div>
            
            <div className="flex gap-12 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-accent transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-accent transition-colors">X / Twitter</Link>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-white">EST. 2024</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Design for Business Logic</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
