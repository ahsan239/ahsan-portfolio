
import { Navigation } from "@/components/navigation";
import { PROJECTS } from "@/app/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AIDemo } from "@/components/ai-demo";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { TrendingUp, Target, Lightbulb, ChevronLeft, Github, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to All Projects
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              <header className="space-y-6">
                <div className="flex gap-2">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 text-primary border-white/10 uppercase tracking-widest text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tight">{project.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{project.shortDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">ROI Metric</p>
                      <p className="text-lg font-bold text-foreground">{project.roiMetric}</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Efficiency Gain</p>
                      <p className="text-lg font-bold text-foreground">{project.businessImpact}</p>
                    </div>
                  </div>
                </div>
              </header>

              <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint="project hero image"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                   </div>
                </div>
              </div>

              <section className="grid gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-sm">
                    <Target className="h-4 w-4" /> The Business Problem
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.problem}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-sm">
                    <Lightbulb className="h-4 w-4" /> The AI Solution
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.solution}</p>
                </div>
              </section>

              <section className="pt-8 border-t border-white/5">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="deep-dive" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-6 px-4 rounded-xl bg-white/5 border border-white/10 group">
                      <div className="flex items-center gap-3 text-left">
                        <Code className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-bold text-foreground group-hover:text-accent transition-colors">Technical Deep Dive</p>
                          <p className="text-xs text-muted-foreground font-normal mt-1">Architecture, code snippets, and deployment details.</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-6 px-4 space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-accent">Architecture Overview</h4>
                        <p className="text-muted-foreground leading-relaxed italic">{project.technicalDeepDive.architecture}</p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-accent">Engineering Challenges</h4>
                        <p className="text-muted-foreground leading-relaxed italic">{project.technicalDeepDive.challenges}</p>
                      </div>
                      {project.technicalDeepDive.codeSnippet && (
                        <div className="space-y-4">
                           <h4 className="font-bold text-accent">Core Logic Snippet</h4>
                           <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-code overflow-x-auto text-primary">
                             <code>{project.technicalDeepDive.codeSnippet}</code>
                           </pre>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                <AIDemo />
                
                <div className="glass-card p-8 rounded-3xl space-y-6">
                  <h3 className="font-headline font-bold text-xl">Project Resources</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5">
                      View on GitHub <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5">
                      Live Environment <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This project demonstrates full-stack competence across cloud infrastructure, LLM prompt engineering, and modern frontend frameworks.
                    </p>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10 space-y-4">
                  <h4 className="font-bold">Interested in similar results?</h4>
                  <p className="text-sm text-muted-foreground">I specialize in building production-ready AI pipelines for enterprises and startups.</p>
                  <Button asChild className="w-full bg-accent text-accent-foreground font-bold hover:bg-accent/90">
                    <Link href="/hire">Start a Conversation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
