
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/app/lib/projects";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database, Code2, Cpu, Globe, ArrowDown, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-accent animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Available for Strategic Projects
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-black leading-[1.1] tracking-tight animate-fade-in-up [animation-delay:100ms]">
                Engineering AI Solutions that <span className="text-gradient">Automate Workflows</span> and Drive Revenue.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                I bridge the gap between complex AI research and practical business value. 
                My focus is on ROI-driven implementations that save thousands of manual hours.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:300ms]">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 rounded-full font-bold">
                  View Case Studies <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 px-8 rounded-full font-bold">
                  Download Resume
                </Button>
              </div>

              <div className="pt-8 flex items-center gap-6 animate-fade-in-up [animation-delay:400ms]">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary overflow-hidden">
                      <Image 
                        src={`https://picsum.photos/seed/${i + 10}/100/100`} 
                        alt="User" 
                        width={40} 
                        height={40} 
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">Trusted by Technical Leaders</p>
                  <p className="text-muted-foreground">Engineering Manager at Fortune 500</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative animate-fade-in-up [animation-delay:500ms]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-float">
                <Image
                  src="https://picsum.photos/seed/hero/600/800"
                  alt="AI Engineer Portrait"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="professional portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl">
                  <p className="text-sm font-bold text-accent">Latest Achievement</p>
                  <p className="text-xs text-muted-foreground leading-tight">Lowered LLM inference costs by 60% for a SaaS startup using semantic caching.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Ticker */}
      <section className="py-12 border-y border-white/5 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-8">
            Specialized in Modern AI & Cloud Infrastructure
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2 font-bold"><Cpu className="h-5 w-5" /> OpenAI</div>
             <div className="flex items-center gap-2 font-bold"><Code2 className="h-5 w-5" /> LangChain</div>
             <div className="flex items-center gap-2 font-bold"><Database className="h-5 w-5" /> Pinecone</div>
             <div className="flex items-center gap-2 font-bold"><Globe className="h-5 w-5" /> AWS</div>
             <div className="flex items-center gap-2 font-bold"><Code2 className="h-5 w-5" /> Next.js</div>
             <div className="flex items-center gap-2 font-bold"><Database className="h-5 w-5" /> Python</div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-bold">Featured AI <span className="text-accent">Case Studies</span></h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                High-impact solutions that focus on solving expensive business inefficiencies. 
                Click to explore the technical architecture and live demos.
              </p>
            </div>
            <Link href="/projects" className="group flex items-center gap-2 font-bold text-accent">
              View All Projects <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard project={PROJECTS[0]} featured />
            <ProjectCard project={PROJECTS[1]} />
            <ProjectCard project={PROJECTS[2]} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-card to-secondary p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-accent/20 blur-[100px] rounded-full" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-black">Ready to scale your business with AI?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a recruiter looking for engineering talent or a business leader seeking 
                automation consulting, I'm here to help you navigate the AI landscape.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 rounded-full font-bold">
                  <Link href="/hire">Book a Discovery Call</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/10 px-10 rounded-full font-bold">
                  <Link href="mailto:hello@aisolutions.me">Send an Email</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-accent" />
              <span className="font-headline font-bold">AI Solutions</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-accent transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 • Built with Next.js & GenAI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
