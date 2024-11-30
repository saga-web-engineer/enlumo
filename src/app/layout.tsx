import { Toaster } from '@/components/ui/sonner';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeProvider } from '@/app/components/theme/ThemeProvider';
import '@/app/globals.css';

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
