"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Code2, Menu, X, User, Briefcase, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/", icon: <LayoutGrid size={14} /> },
  { name: "About", href: "/about", icon: <User size={14} /> },
  { name: "Projects", href: "/#projects", icon: <Code2 size={14} /> },
  { name: "Experience", href: "/#experience", icon: <Briefcase size={14} /> },
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
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-500",
        scrolled ? "top-4 scale-[0.98]" : "top-6"
      )}
    >
      <div className="glass-card rounded-full px-6 h-14 flex items-center justify-between border-white/10 shadow-2xl bg-background/60 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Code2 size={16} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest",
                pathname === link.href 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          <div className="hidden md:block h-4 w-[1px] bg-white/10 mx-1" />
          <Link href="https://github.com/alexrivera" target="_blank" className="hidden md:flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <Github size={18} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 glass-card rounded-3xl p-6 border border-white/10 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link href="https://github.com/alexrivera" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                <Github size={16} /> GitHub
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}