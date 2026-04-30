import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteLoader } from "@/components/site-loader";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-family-sans",
  display: "swap",
});

const mono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-family-mono",
  display: "swap",
});

const title = "Tiaz Portfolio";
const description =
  "Portfolio of Gazi Asif Imtiaz (Tiaz), a Dhaka-based developer building expressive, high-performance web platforms with Next.js, TypeScript, and motion design.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Tiaz Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <SiteLoader />
        <ThemeProvider>
          <LenisProvider>
            <div className="flex min-h-screen flex-col">
              <a href="#main" className="skip-link">
                Skip to main content
              </a>
              <SiteHeader />
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
