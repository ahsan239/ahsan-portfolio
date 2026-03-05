
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
    slug: "ai-customer-support-automator",
    title: "AI Customer Support Automator",
    shortDescription: "End-to-end support pipeline using RAG and LLMs to handle complex queries.",
    businessImpact: "Reduced Support Tickets by 40%",
    roiMetric: "Saved $50k/year in operational costs",
    problem: "The support team was overwhelmed by repetitive manual queries, leading to slow response times and high churn.",
    solution: "Built a RAG-based support agent using GPT-4 and Vector databases that provides instant, accurate answers from documentation.",
    techStack: ["OpenAI", "Pinecone", "Next.js", "LangChain"],
    imageUrl: "https://picsum.photos/seed/support/800/600",
    technicalDeepDive: {
      architecture: "The system uses a retrieval-augmented generation (RAG) architecture. Documentation is chunked and stored in Pinecone. Queries are embedded and retrieved via cosine similarity before being passed to GPT-4.",
      challenges: "Handling hallucination was a major challenge. We implemented a multi-stage verification step where the LLM cross-references the retrieved context for factual consistency.",
      codeSnippet: "const response = await chain.call({ query: userPrompt });"
    }
  },
  {
    slug: "intelligent-doc-processor",
    title: "Intelligent Document Processor",
    shortDescription: "Automated data extraction from legacy PDF formats using computer vision.",
    businessImpact: "Increased Processing Speed by 300%",
    roiMetric: "Reclaimed 120 manual hours/month",
    problem: "Marketing teams spent 10+ hours per week manually summarizing and extracting data from inconsistent legacy PDF reports.",
    solution: "Developed a vision-augmented pipeline that extracts structured JSON from unstructured documents using specialized OCR and LLMs.",
    techStack: ["Python", "FastAPI", "Google Vision", "Mistral AI"],
    imageUrl: "https://picsum.photos/seed/doc/800/600",
    technicalDeepDive: {
      architecture: "Python backend using FastAPI to process PDF uploads. It utilizes custom vision models to locate fields and Mistral for context-aware text normalization.",
      challenges: "Low-quality scans caused OCR failures. We solved this by implementing an image preprocessing step with noise reduction and contrast enhancement.",
      codeSnippet: "def process_document(pdf_bytes):\n  # OCR + LLM logic\n  return structured_data"
    }
  },
  {
    slug: "predictive-sales-engine",
    title: "Predictive Sales Engine",
    shortDescription: "Predictive lead scoring model integrated into CRM for sales optimization.",
    businessImpact: "Improved Lead Conversion by 15%",
    roiMetric: "Generated $200k in additional pipeline",
    problem: "Sales reps had no way to prioritize leads, wasting 60% of their time on cold prospects that never converted.",
    solution: "Engineered a predictive scoring model that ranks leads based on behavioral data, firmographics, and historical patterns.",
    techStack: ["PyTorch", "AWS SageMaker", "Salesforce API", "React"],
    imageUrl: "https://picsum.photos/seed/sales/800/600",
    technicalDeepDive: {
      architecture: "A custom ensemble model running on AWS. It ingests real-time CRM events and calculates scores every 15 minutes.",
      challenges: "Data drift was the primary issue. We implemented an automated retraining pipeline that triggers when model performance drops below a threshold.",
      codeSnippet: "model.predict(lead_features)"
    }
  }
];
