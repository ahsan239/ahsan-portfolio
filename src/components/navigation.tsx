
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Mail, Code2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/hire" },
  { name: "Contact", href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300",
        scrolled ? "top-4 scale-[0.98]" : "top-6"
      )}
    >
      <div className="glass-card rounded-2xl px-6 h-16 flex items-center justify-between border-white/10 shadow-2xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
            <Code2 size={18} />
          </div>
          <span className="font-bold tracking-tight hidden sm:block">ALEX.DEV</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-primary uppercase tracking-widest text-xs",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-white/10">
            <ThemeToggle />
            <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-white/5">
              <Github size={18} />
            </Link>
          </div>
          
          <Button asChild size="sm" className="rounded-lg h-9 px-4 font-bold shadow-lg shadow-primary/20 hidden sm:flex">
            <Link href="/#contact">Let's Talk</Link>
          </Button>

          {/* Mobile Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 glass-card rounded-2xl p-6 border border-white/10 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <ThemeToggle />
              <div className="flex gap-4">
                <Link href="https://github.com"><Github size={20} /></Link>
                <Link href="mailto:hello@alexrivera.dev"><Mail size={20} /></Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
