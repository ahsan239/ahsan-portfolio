
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Projects", href: "/#projects" },
  { name: "Services", href: "/hire" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300",
        scrolled ? "top-4" : "top-6"
      )}
    >
      <div className="glass-card rounded-2xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
            <Code2 size={18} />
          </div>
          <span className="font-bold tracking-tight hidden sm:block">DevPort</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="h-4 w-px bg-border hidden sm:block" />
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <Github size={18} />
            </Link>
            <Link 
              href="mailto:hello@dev.io" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
