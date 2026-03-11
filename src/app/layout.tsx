
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { InteractiveBackground } from '@/components/interactive-background';

export const metadata: Metadata = {
  title: {
    default: 'Ahsan | Senior Software Engineer & AI Architect',
    template: '%s | Ahsan'
  },
  description: 'Software Engineer specializing in Next.js, AI infrastructure, and high-performance digital products. Architecting scalable solutions for the modern web.',
  keywords: ['Software Engineer', 'AI Architect', 'Next.js', 'React', 'Full Stack Developer', 'LLM Engineering'],
  authors: [{ name: 'Ahsan' }],
  creator: 'Ahsan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ahsan.dev',
    title: 'Ahsan | Senior Software Engineer & AI Architect',
    description: 'Architecting high-performance digital products and strategic AI infrastructure.',
    siteName: 'Ahsan Portfolio',
    images: [
      {
        url: 'https://picsum.photos/seed/ahsan-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Ahsan Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahsan | Senior Software Engineer',
    description: 'Architecting high-performance digital products and strategic AI infrastructure.',
    creator: '@ahsan_dev',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
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
              "name": "Ahsan",
              "jobTitle": "Senior Software Engineer",
              "url": "https://ahsan.dev",
              "sameAs": [
                "https://github.com/ahsan",
                "https://linkedin.com/in/ahsan"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white transition-colors duration-300 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <InteractiveBackground />
            <div className="relative z-0">
              {children}
            </div>
            <Footer />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
