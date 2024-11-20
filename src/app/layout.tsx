import type { Metadata } from 'next';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeProvider } from '@/app/components/theme/ThemeProvider';
import '@/app/globals.css';
import { siteDescription, siteName, siteUrl } from '@/app/utils/siteSettings';

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  openGraph: {
    url: siteUrl,
    type: 'website',
    images: '/ogp.jpg',
    locale: 'ja_JP',
    siteName: siteName,
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
        </ThemeProvider>
      </body>
    </html>
  );
}
