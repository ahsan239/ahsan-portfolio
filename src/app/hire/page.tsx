"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  BrainCircuit, Rocket, LineChart, Code2, Calendar, 
  CheckCircle2, ArrowRight, Globe, Database, Cpu, 
  Sparkles, ShieldCheck, Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HirePage() {
  const services = [
    {
      title: "Strategic Consulting",
      subtitle: "AI Infrastructure & Architecture",
      icon: <BrainCircuit className="h-6 w-6 text-accent" />,
      features: [
        "LLM Implementation Roadmaps",
        "RAG Pipeline Engineering",
        "Cost-Benefit AI Analysis",
        "Architecture Security Audits"
      ],
      cta: "Book Discovery Session",
      href: "#booking",
      popular: false
    },
    {
      title: "Full-Stack Development",
      subtitle: "Production-Ready Digital Products",
      icon: <Rocket className="h-6 w-6 text-primary" />,
      features: [
        "Scalable Next.js Platforms",
        "Real-time Data Systems",
        "High-Performance API Design",
        "Cloud-Native Deployments"
      ],
      cta: "Inquire about Project",
      href: "mailto:hello@ahsan.dev",
      popular: true
    }
  ];

  const valueProps = [
    { icon: <Zap className="text-yellow-400" />, title: "Rapid Execution", desc: "Moving from prototype to production with velocity and precision." },
    { icon: <ShieldCheck className="text-green-400" />, title: "Production Grade", desc: "Zero-compromise approach to security, scalability, and testing." },
    { icon: <Sparkles className="text-primary" />, title: "AI-Native", desc: "Infusing intelligence into workflows to automate the mundane." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dot-pattern selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Turn your vision into <span className="text-gradient">Production</span> Code.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in [animation-delay:200ms]">
              I partner with forward-thinking teams to build high-performance software 
              and implement strategic AI infrastructure that delivers measurable ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto animate-fade-in-up [animation-delay:400ms]">
            {services.map((service, idx) => (
              <Card key={idx} className={cn(
                "glass-card overflow-hidden border-white/10 group relative transition-all hover:-translate-y-2",
                service.popular && "border-primary/50 ring-1 ring-primary/20"
              )}>
                {service.popular && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-[10px] font-black uppercase tracking-widest rounded-bl-xl text-white">
                    Most Requested
                  </div>
                )}
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-primary font-bold text-xs tracking-widest uppercase">{service.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <ul className="space-y-4">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-muted-foreground text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button asChild size="lg" className={cn(
                    "w-full font-bold rounded-xl h-12",
                    service.popular ? "bg-primary" : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  )}>
                    <Link href={service.href}>
                      {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <section className="mb-24 animate-fade-in-up [animation-delay:600ms]">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {valueProps.map((prop, idx) => (
                 <div key={idx} className="p-8 rounded-3xl glass-card border-white/5 space-y-4 text-center">
                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      {prop.icon}
                    </div>
                    <h3 className="font-bold text-lg">{prop.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{prop.desc}</p>
                 </div>
               ))}
            </div>
          </section>

          <section id="booking" className="max-w-4xl mx-auto animate-fade-in-up [animation-delay:800ms]">
            <div className="bg-secondary/30 rounded-[3rem] p-12 border border-white/5 text-center space-y-12 shadow-2xl">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 rounded-full bg-primary/20 items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Schedule an Intro Call</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Let's discuss your project scope, technical challenges, and how we can 
                  achieve your business objectives with a high-impact solution.
                </p>
              </div>

              <div className="aspect-[21/9] w-full bg-background/50 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden relative">
                <div className="text-center space-y-6 z-10">
                   <p className="text-xs font-mono text-primary/70 uppercase tracking-[0.2em]">[ CAL.COM EMBED READY ]</p>
                   <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl px-8 h-12 font-bold">
                     Initialize Booking Engine
                   </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}