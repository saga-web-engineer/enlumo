import type { Metadata } from 'next';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeProvider } from '@/app/components/theme/ThemeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Relumo（リルモ）',
  description:
    'Relumo（リルモ）へようこそ。Relumoは、招待された人だけが参加できるプライベートな掲示板アプリ。仕事の話や何気ない雑談も、気ままにシェア。もっと自由に、もっと開放的に。安心して心を開けるプライベートな空間を提供します。',
  openGraph: {
    url: 'https://relumo.vercel.app',
    type: 'website',
    images: '/ogp.jpg',
    locale: 'ja_JP',
    siteName: 'Relumo（リルモ）',
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
