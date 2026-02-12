import { Metadata, Viewport } from "next";
import "./globals.css";
import { outfit, roboto } from "./ui/fonts";
import { Providers } from "./providers";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Pixela - Descubre y comparte apasionantes historias cinematográficas",
  description:
    "Pixela es una comunidad para los amantes del cine y las series. Descubre historias que te conectan con grandes producciones audiovisuales.",
  keywords: [
    "streaming",
    "películas",
    "series",
    "cine",
    "comunidad",
    "TMDB",
    "Pixela",
  ],
  authors: [{ name: "Pixela" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Pixela - Pasión por el cine y las series",
    description:
      "Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series.",
    url: "https://pixela.io",
    siteName: "Pixela",
    images: [
      {
        url: "/images/pixela-og-image.jpg",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  other: {
    "X-UA-Compatible": "IE=edge",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

const STYLES = {
  html: `${roboto.variable} ${outfit.variable}`,
  body: "antialiased bg-pixela-dark",
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={STYLES.html}>
      <head>
        {/* Preconectar a dominios importantes - no soportado directamente en metadata o viewport */}
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body className={STYLES.body} suppressHydrationWarning={true}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
