import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { DiscoveryProvider } from '@/components/discovery-provider';
import { SiteHeader } from '@/components/site-header';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: {
    default: 'College Discovery Platform',
    template: '%s | College Discovery Platform'
  },
  description:
    'A production-quality college discovery experience with search, filters, comparison, saved colleges, and resilient fallbacks.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <DiscoveryProvider>
          <div className="relative isolate min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.06]" />
            <SiteHeader />
            <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </DiscoveryProvider>
      </body>
    </html>
  );
}