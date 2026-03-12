
'use client';

import { Navigation } from "@/components/navigation";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { AIDemo } from "@/components/ai-demo";
import { ChevronLeft, Github, ExternalLink, Code, Target, Zap, Activity } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client, PROJECT_BY_SLUG_QUERY } from "@/lib/sanity";

export default function ProjectPage() {
  const params = useParams();
  const db = useFirestore();
  const slug = params?.slug as string;
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Still use Firestore for the user profile/contact info
  const profileRef = useMemoFirebase(() => doc(db, 'users', 'ahsan'), [db]);
  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      try {
        const data = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
        setProject(data);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Activity className="animate-spin text-primary h-10 w-10" />
        <p className="text-muted-foreground text-xs uppercase font-black tracking-widest animate-pulse">
          Syncing with Sanity...
        </p>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 animate-fade-in">
            <ChevronLeft className="h-3 w-3" /> Back to Engineering Portfolio
          </Link>

          <header className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20 animate-fade-in-up">
            <div className="lg:col-span-8 space-y-6">
               <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[1] md:leading-[0.85] text-gradient">
                {project.title}
               </h1>
               <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end gap-6 border-l border-white/10 pl-6">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Business Value</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">Measured Result</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Integration</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">Production Ready</p>
               </div>
            </div>
          </header>

          <div className="relative aspect-video w-full mb-16 md:mb-32 rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl group animate-fade-in [animation-delay:200ms]">
            <Image
              src={project.imageUrl || `https://picsum.photos/seed/${project._id}/1200/630`}
              alt={project.title}
              fill
              className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className="lg:col-span-7 space-y-16 animate-fade-in-up [animation-delay:400ms]">
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <span className="text-[10px] font-black uppercase tracking-widest">01 // Description</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex gap-4 items-start">
                   <Target className="h-6 w-6 text-primary shrink-0 mt-1" />
                   <div className="space-y-4">
                     <p className="text-lg md:text-2xl font-light leading-relaxed text-foreground italic">
                      "{project.shortDescription}"
                     </p>
                   </div>
                </div>
              </section>

              {project.fullDescription && (
                <section className="space-y-6">
                  <div className="flex items-center gap-4 text-muted-foreground/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">02 // Deep Dive</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="flex gap-4 items-start">
                     <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                     <div className="text-base md:text-xl font-medium leading-relaxed text-muted-foreground prose prose-invert">
                        {/* Render rich text here if using PortableText component */}
                        {typeof project.fullDescription === 'string' ? project.fullDescription : "Detailed analysis available via project console."}
                     </div>
                  </div>
                </section>
              )}
              
              {project.gallery && project.gallery.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-4 text-muted-foreground/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">03 // Artifacts</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img: any, idx: number) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                        <Image src={img.url} alt={`Screenshot ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 animate-fade-in-up [animation-delay:600ms]">
               <AIDemo />
               
               <div className="space-y-6 p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 shadow-xl">
                  <h3 className="text-lg font-black uppercase tracking-tighter text-foreground">Project Resources</h3>
                  <div className="space-y-4">
                    {project.liveLink && (
                      <Link href={project.liveLink} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest group">
                        Live Demo <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link href={project.githubLink} target="_blank" className="flex items-center justify-between p-4 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest group">
                        Source Code <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
