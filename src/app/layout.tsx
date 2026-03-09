
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'Alex Rivera | Senior Software Engineer & AI Architect',
    template: '%s | Alex Rivera'
  },
  description: 'Senior Software Engineer specializing in Next.js, AI infrastructure, and high-performance digital products. Architecting scalable solutions for the modern web.',
  keywords: ['Software Engineer', 'AI Architect', 'Next.js', 'React', 'Full Stack Developer', 'LLM Engineering'],
  authors: [{ name: 'Alex Rivera' }],
  creator: 'Alex Rivera',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexrivera.dev',
    title: 'Alex Rivera | Senior Software Engineer & AI Architect',
    description: 'Architecting high-performance digital products and strategic AI infrastructure.',
    siteName: 'Alex Rivera Portfolio',
    images: [
      {
        url: 'https://picsum.photos/seed/alex-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Alex Rivera Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Rivera | Senior Software Engineer',
    description: 'Architecting high-performance digital products and strategic AI infrastructure.',
    creator: '@alexrivera_dev',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alex Rivera",
              "jobTitle": "Senior Software Engineer",
              "url": "https://alexrivera.dev",
              "sameAs": [
                "https://github.com/alexrivera",
                "https://linkedin.com/in/alexrivera"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
