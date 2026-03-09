"use client";

import { useState } from "react";
import { interactiveAIDemo } from "@/ai/flows/interactive-ai-demo-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Terminal } from "lucide-react";

export function AIDemo() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await interactiveAIDemo({ userQuery: query });
      setResponse(result.aiResponse);
    } catch (error) {
      console.error("Demo error:", error);
      setResponse("Connection failed. Check your API key or endpoint.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card border-white/10 overflow-hidden shadow-2xl rounded-2xl">
      <CardHeader className="bg-white/5 border-b border-white/10 py-4 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <Terminal size={14} />
          Interactive Playground
        </CardTitle>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/50" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <div className="h-2 w-2 rounded-full bg-green-500/50" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-black/40 rounded-xl p-4 min-h-[140px] border border-white/5 font-mono text-xs leading-relaxed">
            {response ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 text-primary/70">
                  <span className="text-green-500">➜</span>
                  <span>ai-response --output</span>
                </div>
                <p className="text-foreground/90 whitespace-pre-wrap">{response}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 italic py-10">
                <Sparkles size={24} className="mb-2 opacity-20" />
                <p>Awaiting user input...</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about AI automation..."
              className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="h-12 w-12 rounded-xl bg-primary text-white hover:bg-primary/90">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 text-[9px] text-muted-foreground uppercase tracking-wider font-bold">
            <div className="h-1 w-1 rounded-full bg-primary" />
            GenKit v1.0 • Gemini Flash
          </div>
        </div>
      </CardContent>
    </Card>
  );
}