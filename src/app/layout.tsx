import type { Metadata } from "next";
import { Google_Sans_Code, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout-comp/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const secondaryFont = Poppins({
  variable: "--font-secondary",
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["latin"],
});

const codeFont = Google_Sans_Code({
  variable: "--font-code",
  weight: ["300", "400", "700", "500", "600", "800"],
  subsets: ["latin"],
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Consolas",
    "Liberation Mono",
    "Menlo",
    "monospace",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.devvarena.com"),
  title: {
    default: "Devvarena UI - Beautiful React Components Built on shadcn/ui",
    template: "%s | Devvarena UI",
  },
  description:
    "A collection of beautiful and reusable React components built on top of shadcn/ui. TypeScript-ready, customizable, and easy to integrate with CLI installation support.",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "shadcn/ui",
    "Radix UI",
    "Tailwind CSS",
    "UI Components",
    "Component Library",
    "React Components",
    "UI Library",
    "Framer Motion",
    "Animation",
  ],
  authors: [{ name: "Devvarena" }],
  creator: "Devvarena",
  publisher: "Devvarena",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ui.devvarena.com",
    title: "Devvarena UI - Beautiful React Components Built on shadcn/ui",
    description:
      "A collection of beautiful and reusable React components built on top of shadcn/ui. TypeScript-ready, customizable, and easy to integrate.",
    siteName: "Devvarena UI",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Devvarena UI - Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devvarena UI - Beautiful React Components Built on shadcn/ui",
    description:
      "A collection of beautiful and reusable React components built on top of shadcn/ui. TypeScript-ready, customizable, and easy to integrate.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} ${codeFont.variable} antialiased font-regular min-h-screen `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
