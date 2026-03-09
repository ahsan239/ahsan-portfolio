"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";

/**
 * @fileOverview Global footer component.
 * Aligns with high-fidelity editorial design standards.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm pt-24 pb-12 mt-20">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          {/* Logo and Tagline */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                <Code2 size={20} />
              </div>
              <span className="font-bold tracking-tighter uppercase text-xl">ALEX.DEV</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed font-light">
              Architecting high-performance digital ecosystems for the modern web.
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6 md:space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Social</h4>
            <ul className="space-y-4">
              <li>
                <Link href="https://github.com/alexrivera" target="_blank" className="text-sm font-bold hover:text-primary transition-colors">GitHub</Link>
              </li>
              <li>
                <Link href="https://linkedin.com/in/alexrivera" target="_blank" className="text-sm font-bold hover:text-primary transition-colors">LinkedIn</Link>
              </li>
            </ul>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3 lg:col-span-2 space-y-6 md:space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/#projects" className="text-sm font-bold hover:text-primary transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-bold hover:text-primary transition-colors">About</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30">
            © 2024 ALEX RIVERA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
