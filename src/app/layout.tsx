import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Ahsan | Senior Software Engineer & AI Architect',
    template: '%s | Ahsan'
  },
  description: 'Software Engineer specializing in building scalable digital systems and intelligent automation workflows.',
  keywords: ['Software Engineer', 'AI Architect', 'Next.js', 'React', 'Full Stack Developer', 'LLM Engineering'],
  authors: [{ name: 'Ahsan' }],
  creator: 'Ahsan',
  icons: {
    icon: [{ url: '/projects/favicon.png', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ahsan.dev',
    title: 'Ahsan | Senior Software Engineer & AI Architect',
    description: 'Software Engineer specializing in building scalable digital systems and intelligent automation workflows.',
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
    description: 'Software Engineer specializing in building scalable digital systems and intelligent automation workflows.',
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
                "https://github.com/ahsan239",
                "https://www.linkedin.com/in/mohd-ahsan-5b40b31b1/"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white transition-colors duration-300 relative" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <FirebaseClientProvider>
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
