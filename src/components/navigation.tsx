"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Work", href: "/#projects" },
  { name: "Services", href: "/hire" },
  { name: "Contact", href: "mailto:hello@aisolutions.me" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="group relative flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter leading-none">
            AI<span className="text-muted-foreground">S.</span>
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-accent absolute -right-3 top-1 animate-pulse" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-accent relative overflow-hidden group",
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {link.name}
              </span>
              <span className="absolute top-full left-0 block text-accent transition-transform duration-300 group-hover:-translate-y-full">
                {link.name}
              </span>
            </Link>
          ))}
          <Link 
            href="/hire" 
            className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-colors"
          >
            Start Project <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
          <nav className="flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-5xl font-black tracking-tighter hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}