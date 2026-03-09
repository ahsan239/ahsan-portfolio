
export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  businessImpact: string;
  roiMetric: string;
  problem: string;
  solution: string;
  techStack: string[];
  imageUrl: string;
  technicalDeepDive: {
    architecture: string;
    challenges: string;
    codeSnippet?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "nexus-saas-platform",
    title: "Nexus SaaS Platform",
    shortDescription: "A high-performance enterprise resource planning tool for distributed teams.",
    businessImpact: "Increased operational efficiency by 35%",
    roiMetric: "Scale to 10k+ concurrent users",
    problem: "Existing ERP tools were bloated, slow, and lacked real-time collaborative features required by modern remote-first companies.",
    solution: "Developed a distributed system using Next.js 15 and a serverless architecture, incorporating real-time state sync via WebSockets.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Tailwind"],
    imageUrl: "https://picsum.photos/seed/nexus/1000/1000",
    technicalDeepDive: {
      architecture: "Micro-frontend architecture using Next.js Zones to allow independent team deployments without compromising bundle size.",
      challenges: "Ensuring consistent latency across global regions. Solved by implementing edge-side caching and a global Redis backplane.",
      codeSnippet: "export const config = { runtime: 'edge' };"
    }
  },
  {
    slug: "ai-content-engine",
    title: "AI Semantic Engine",
    shortDescription: "RAG-based documentation search providing instant, contextual technical support.",
    businessImpact: "Reduced support ticket volume by 55%",
    roiMetric: "Avg. response time: <200ms",
    problem: "Developers struggled to find specific technical answers in massive legacy documentation sets.",
    solution: "Engineered a vector-search pipeline that indexes technical docs and provides natural language answers using Gemini 1.5 Flash.",
    techStack: ["Genkit", "Firebase", "Pinecone", "Python", "Mistral"],
    imageUrl: "https://picsum.photos/seed/ai-engine/1000/1000",
    technicalDeepDive: {
      architecture: "A Genkit-powered flow that handles document embedding on-the-fly and uses a RAG pattern with semantic reranking.",
      challenges: "Managing token costs while maintaining high accuracy. Implemented a tiered embedding strategy to prune irrelevant context.",
      codeSnippet: "const { output } = await ai.generate({ prompt: contextPrompt });"
    }
  },
  {
    slug: "crypto-portfolio-tracker",
    title: "Vantage Crypto Tracker",
    shortDescription: "Real-time asset monitoring with automated tax reporting and risk analysis.",
    businessImpact: "Processed $2M in transaction volume",
    roiMetric: "Zero-latency price updates",
    problem: "Users lacked a unified dashboard to track cross-chain assets with professional-grade risk metrics.",
    solution: "Built a robust data aggregator that interfaces with multiple CEX and DEX APIs to provide a consolidated financial view.",
    techStack: ["React", "D3.js", "Web3.js", "FastAPI", "AWS"],
    imageUrl: "https://picsum.photos/seed/crypto/1000/1000",
    technicalDeepDive: {
      architecture: "Event-driven architecture using AWS Lambda and SQS to process thousands of price updates per second.",
      challenges: "Handling rate-limiting from public blockchain nodes. Implemented a custom retry-proxy with exponential backoff.",
      codeSnippet: "const provider = new ethers.providers.JsonRpcProvider(URL);"
    }
  }
];
