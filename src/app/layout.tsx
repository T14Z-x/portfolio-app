import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteLoader } from "@/components/site-loader";
import "./globals.css";

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
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <Script
        id="theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              try {
                var storedTheme = window.localStorage.getItem("portfolio-theme-preference");
                document.documentElement.dataset.theme =
                  storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
              } catch (error) {
                document.documentElement.dataset.theme = "dark";
              }
            })();
          `,
        }}
      />
      <body className="antialiased">
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
