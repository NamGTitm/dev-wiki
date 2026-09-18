import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://py.namgt.dev"),
  title: { default: "NamGT Python Wiki", template: "%s | NamGT Python Wiki" },
  description: "Wiki Python tiếng Việt: học theo lộ trình, tra cứu nhanh và đi sâu vào cách Python hoạt động.",
  alternates: { canonical: "https://py.namgt.dev" },
  openGraph: { title: "NamGT Python Wiki", description: "Học và tra cứu Python từ nền tảng đến nâng cao.", url: "https://py.namgt.dev", siteName: "NamGT Python Wiki", type: "website" },
  twitter: { card: "summary", title: "NamGT Python Wiki", description: "Học và tra cứu Python từ nền tảng đến nâng cao." },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
