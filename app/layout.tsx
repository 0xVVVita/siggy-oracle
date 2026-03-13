import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RITUAL ORACLE SYSTEM V1.0',
  description: 'Mystical AI oracle connected to the Ethereum blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>∞</text></svg>" />
      </head>
      <body className="antialiased">
        {/* Star field background */}
        <div className="star-field" />
        
        {/* Top Header - Fixed */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-[#041410] border-b border-[rgba(0,255,200,0.22)] flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <img
              src="/Translucent.png"
              alt="Logo"
              className="w-16 h-16"
              style={{
                filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
              }}
            />
            <h1 className="text-[14px] font-bold tracking-[0.3em]">
              <span className="text-[#00ffcc]">RITUAL</span>{' '}
              <span className="text-[#a0e8d0]">ORACLE SYSTEM V1.0</span>
            </h1>
          </div>

          <button className="text-[rgba(0,255,200,0.4)] hover:text-[#00ffcc] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="currentColor"
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
              />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
