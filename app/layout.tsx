import type React from 'react';
import './globals.css';

export const metadata = {
  title: 'Pipeline Studio',
  description: 'Mocked pipeline studio for 2D-to-3D product conversion'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-slate-100">
        {children}
      </body>
    </html>
  );
}
