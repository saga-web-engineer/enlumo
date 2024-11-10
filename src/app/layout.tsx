import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Wrapper } from '@/app/components/Wrapper';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Enlumo',
  description:
    'Enlumoは「Enlighten（啓発する）」と「Lumo（光）」を掛け合わせ、問題顧客の情報を共有することで業界を健全に照らすという意味を込めています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]">
          <Header />
          <main>
            <Wrapper>{children}</Wrapper>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
