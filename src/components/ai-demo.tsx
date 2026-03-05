
"use client";

import { useState } from "react";
import { interactiveAIDemo } from "@/ai/flows/interactive-ai-demo-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Send, Loader2, Bot } from "lucide-react";

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
      setResponse("I'm sorry, I'm having trouble connecting to the brain right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card border-accent/20 overflow-hidden shadow-2xl">
      <CardHeader className="bg-accent/5 border-b border-accent/10 py-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-widest">
          <Sparkles className="h-4 w-4" />
          Live Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-background/50 rounded-xl p-4 min-h-[120px] border border-white/5 flex flex-col">
            {response ? (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{response}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic text-center my-auto">
                Ask me something about how I can solve your business problems...
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How can AI help automate my marketing reports?"
              className="bg-background/50 border-white/10 focus:border-accent/50"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
            Powered by GenAI Flow Engine • Strictly Rate Limited
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
