import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/app/lib/projects";
import { ArrowDownRight, ArrowRight, Zap, Globe, Layers, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main")!;

  return (
    <div className="min-h-screen bg-background text-foreground font-body brutalist-grid">
      <Navigation />
      
      {/* Hero Section - Inspired by Jack Elder's layout */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-4 text-accent font-black text-[10px] uppercase tracking-[0.5em]">
              <div className="h-[1px] w-12 bg-accent" />
              Strategic AI Engineering
            </div>
            
            <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter text-reveal">
              <span>DESIGNING</span> <br />
              <span className="text-muted-foreground">INTELLIGENT</span> <br />
              <span>SYSTEMS.</span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mb-10 border-l border-white/10 pl-6">
              I partner with forward-thinking organizations to build production-grade AI infrastructure and high-performance LLM pipelines.
            </p>
            <Link 
              href="/#projects" 
              className="group inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-accent transition-colors"
            >
              See the work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Ambient Drifting Image (Replacing Video) */}
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-40 mask-fade-bottom overflow-hidden hidden lg:block">
          <div className="relative w-full h-full animate-drift">
             <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section id="projects" className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Selected <br /> <span className="text-muted-foreground">Cases</span>
            </h2>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Capabilities</p>
              <div className="flex gap-4 text-xs font-bold opacity-40">
                <span>RAG</span> • <span>AGENTS</span> • <span>MLOPS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Services / Process Section */}
      <section className="py-32 bg-white/2">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter sticky top-32">
                Strategic <br /> Approach
              </h3>
            </div>
            
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-16">
              {[
                { title: "Audit & Strategy", desc: "Deep analysis of existing data pipelines and bottleneck identification.", icon: <Globe className="h-6 w-6" /> },
                { title: "Rapid Prototyping", desc: "Building functional MVP LLM solutions within 2-week sprints.", icon: <Zap className="h-6 w-6" /> },
                { title: "Infrastructure", desc: "Architecting scalable cloud environments for low-latency AI ops.", icon: <Layers className="h-6 w-6" /> },
                { title: "Security First", desc: "Enterprise-grade safety guardrails and data privacy compliance.", icon: <ShieldCheck className="h-6 w-6" /> }
              ].map((service, idx) => (
                <div key={idx} className="space-y-6 group">
                  <div className="h-12 w-12 flex items-center justify-center bg-white/5 rounded-full border border-white/5 group-hover:border-accent/50 group-hover:text-accent transition-all duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-black tracking-tight">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed font-light">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Minimalist but Impactful */}
      <section className="py-48 text-center border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12">
            Let's <span className="text-muted-foreground">Ship</span> Value.
          </h2>
          <Link 
            href="/hire" 
            className="group inline-flex items-center gap-8 bg-white text-black px-12 py-6 rounded-full text-lg font-black uppercase tracking-[0.2em] hover:bg-accent transition-all duration-500 hover:scale-105 shadow-2xl"
          >
            Start Conversation <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            © 2024 AI SOLUTIONS • ARCHITECTED FOR SCALE
          </p>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em]">
            <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-accent transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}