import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppToaster } from "@/components/toaster";
import { RouteToasts } from "@/components/route-toasts";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tobiira Account",
  description: "Manage your Tobiira organizations and profile",
  manifest: "/manifest.json",
};

export const viewport = "width=device-width, initial-scale=1, viewport-fit=cover"
export const themeColor = "#000000"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="tobiira-theme"
        >
          {children}
          <RouteToasts />
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
