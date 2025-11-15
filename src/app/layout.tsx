import type { Metadata } from 'next';
import { AppProviders } from './providers';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import '@/app/styles/globals.scss';
import styles from './layout.module.scss';

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
    <html lang="ru" suppressHydrationWarning>
      <body>
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
