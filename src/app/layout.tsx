import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Solutions | Strategic Engineering & Automation',
  description: 'Deploying high-impact AI infrastructure and LLM pipelines focused on measurable ROI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
