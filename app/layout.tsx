import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Developer Knowledge Base`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: { title: `${site.name} — Developer Knowledge Base`, description: site.description, url: `${site.url}/`, siteName: site.name, type: "website" },
  twitter: { card: "summary", title: site.name, description: site.description },
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
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme={false}
          disableTransitionOnChange
          storageKey="devhubs-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
