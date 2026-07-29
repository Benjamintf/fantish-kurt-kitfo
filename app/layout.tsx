import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fantish Kurt and Kitfo | ፋንትሽ ቁርጥ እና ክትፎ",
  description: "A premium Ethiopian dining and hotel experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
