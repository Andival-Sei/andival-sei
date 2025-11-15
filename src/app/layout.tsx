import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from './providers';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import '@/app/styles/globals.scss';
import styles from './layout.module.scss';

// Настройка шрифта Inter с оптимизацией Next.js
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Andival SEI - Portfolio',
  description: 'Портфолио разработчика',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <AppProviders>
          <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
