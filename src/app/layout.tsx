import type { Metadata } from 'next';
import { fallbackVariable, notoSansSC } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chester Charles Systems Portal',
  description: 'Chester Charles Systems Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansSC.className} antialiased`}
        style={{ fontFamily: `var(${fallbackVariable})` }}
      >
        {children}
      </body>
    </html>
  );
}
