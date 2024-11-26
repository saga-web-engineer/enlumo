import type { Metadata } from 'next';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeProvider } from '@/app/components/theme/ThemeProvider';
import '@/app/globals.css';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/app/utils/siteSettings';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    url: SITE_URL,
    type: 'website',
    images: '/ogp.jpg',
    locale: 'ja_JP',
    siteName: SITE_NAME,
  },
  twitter: {
    site: '@saga_engineer',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]">
            <Header />
            <main>
              <Wrapper className="h-full">{children}</Wrapper>
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
