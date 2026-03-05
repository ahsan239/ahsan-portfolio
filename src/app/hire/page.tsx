
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BrainCircuit, Rocket, LineChart, Code2, Calendar, CheckCircle2, ArrowRight, Globe, Database, Cpu } from "lucide-react";
import Link from "next/link";

export default function HirePage() {
  const services = [
    {
      title: "For Recruiters",
      subtitle: "Full-time Engineering Leadership",
      icon: <BrainCircuit className="h-6 w-6 text-accent" />,
      features: [
        "LLM Implementation Strategy",
        "Senior Full-Stack Architecture",
        "Team Mentorship & Growth",
        "Production-Grade AI DevOps"
      ],
      cta: "Review Full Portfolio",
      href: "/#projects"
    },
    {
      title: "For Businesses",
      subtitle: "Custom AI Automation & Consulting",
      icon: <Rocket className="h-6 w-6 text-primary" />,
      features: [
        "Workflow Automation Audits",
        "LLM Cost Optimization",
        "Data Pipeline Engineering",
        "Bespoke RAG Solutions"
      ],
      cta: "Book Discovery Call",
      href: "#booking"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
            <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tight">
              Work with a <span className="text-gradient">Strategic</span> AI Partner
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I don't just ship models; I build solutions that impact your bottom line. 
              Let's turn your expensive manual workflows into automated, intelligent pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {services.map((service, idx) => (
              <Card key={idx} className="glass-card overflow-hidden border-white/10 group">
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-accent font-bold text-sm tracking-wide uppercase">{service.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <ul className="space-y-4">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full">
                    <Link href={service.href}>
                      {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <section id="booking" className="max-w-4xl mx-auto">
            <div className="bg-secondary/30 rounded-[3rem] p-12 border border-white/5 text-center space-y-12">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 rounded-full bg-accent/20 items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-3xl font-headline font-bold">Schedule a 15-Minute Intro</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  No pressure. We'll discuss your specific pain points and see if an AI implementation 
                  is the right strategic move for your team.
                </p>
              </div>

              {/* Placeholder for Calendar Integration */}
              <div className="aspect-[16/9] w-full bg-background rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4">
                   <p className="text-sm font-code text-primary">[ CAL.COM EMBED PLACEHOLDER ]</p>
                   <Button variant="outline" className="border-accent/30 text-accent">Initialize Booking Engine</Button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-24 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-12">Trusted by 20+ Organizations Globally</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale items-center">
              <div className="flex items-center gap-2 font-black text-xl"><Globe className="h-6 w-6" /> TECHCORP</div>
              <div className="flex items-center gap-2 font-black text-xl"><Database className="h-6 w-6" /> DATALABS</div>
              <div className="flex items-center gap-2 font-black text-xl"><Cpu className="h-6 w-6" /> AI SYSTEMS</div>
              <div className="flex items-center gap-2 font-black text-xl"><LineChart className="h-6 w-6" /> INSIGHT.CO</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
