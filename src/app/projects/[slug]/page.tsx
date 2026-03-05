import { Navigation } from "@/components/navigation";
import { PROJECTS } from "@/app/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AIDemo } from "@/components/ai-demo";
import { TrendingUp, Target, Lightbulb, ChevronLeft, Github, ExternalLink, Code } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body brutalist-grid">
      <Navigation />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-12">
            <ChevronLeft className="h-3 w-3" /> All Projects
          </Link>

          <header className="grid lg:grid-cols-12 gap-12 mb-24">
            <div className="lg:col-span-8 space-y-8">
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                {project.title}
               </h1>
               <div className="flex flex-wrap gap-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end gap-6 border-l border-white/10 pl-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">Efficiency Gain</p>
                  <p className="text-2xl font-bold">{project.businessImpact}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">ROI Delivered</p>
                  <p className="text-2xl font-bold">{project.roiMetric}</p>
               </div>
            </div>
          </header>

          <div className="relative aspect-[21/9] w-full mb-32 rounded-lg overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
              data-ai-hint="case study hero"
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-7 space-y-32">
              <section className="space-y-10">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-xs font-black uppercase tracking-widest">01 // Problem</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <p className="text-2xl font-light leading-relaxed text-foreground">
                  {project.problem}
                </p>
              </section>

              <section className="space-y-10">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-xs font-black uppercase tracking-widest">02 // Solution</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <p className="text-2xl font-light leading-relaxed text-foreground">
                  {project.solution}
                </p>
              </section>

              <section className="space-y-10 p-12 bg-white/2 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4 text-accent">
                  <Code className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Technical Deep Dive</span>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-black uppercase tracking-tight">Architecture</h4>
                    <p className="text-muted-foreground leading-relaxed italic">{project.technicalDeepDive.architecture}</p>
                  </div>
                  {project.technicalDeepDive.codeSnippet && (
                    <div className="space-y-4">
                       <h4 className="text-lg font-black uppercase tracking-tight">Core Implementation</h4>
                       <pre className="p-6 rounded-2xl bg-black border border-white/10 text-xs font-code overflow-x-auto text-primary shadow-inner">
                         <code>{project.technicalDeepDive.codeSnippet}</code>
                       </pre>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-5 sticky top-32 space-y-12">
               <AIDemo />
               
               <div className="space-y-8 p-10 bg-white/2 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Project Resources</h3>
                  <div className="space-y-4">
                    <Link href="#" className="flex items-center justify-between p-4 bg-white/5 hover:bg-accent hover:text-black rounded-xl transition-all font-bold text-sm uppercase tracking-widest">
                      View Source <Github className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="flex items-center justify-between p-4 bg-white/5 hover:bg-accent hover:text-black rounded-xl transition-all font-bold text-sm uppercase tracking-widest">
                      Live Environment <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}