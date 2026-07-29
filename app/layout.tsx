import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: 'Fantish Kurt and Kitfo | ፋንቲሽ ቁርት እና ክትፎ',
  description: 'An Ethiopian table, made memorable.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fantish',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}