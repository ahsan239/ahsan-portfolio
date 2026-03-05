"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Projects", href: "/#projects" },
  { name: "Services", href: "/hire" },
  { name: "Process", href: "/#process" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="container mx-auto px-4">
        <div 
          className={cn(
            "flex h-16 items-center justify-between px-6 rounded-2xl transition-all duration-500 border border-white/5",
            scrolled ? "bg-background/80 backdrop-blur-2xl shadow-2xl" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-primary/20 group-hover:bg-primary transition-all duration-500">
              <BrainCircuit className="h-6 w-6 text-accent" />
            </div>
            <span className="font-headline font-black text-2xl tracking-tighter hidden sm:block">
              AI<span className="text-accent">S</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-white/10" />
            <Button asChild className="bg-white text-black hover:bg-white/90 font-black rounded-full px-8 h-10 transition-transform hover:scale-105">
              <Link href="/hire">Contact</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[100px] z-50 bg-background/95 backdrop-blur-3xl p-8 animate-in slide-in-from-top duration-500">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-4xl font-black tracking-tighter border-b border-white/5 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild size="lg" className="bg-primary text-white mt-4 font-black rounded-full">
              <Link href="/hire" onClick={() => setIsOpen(false)}>Discovery Call</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
