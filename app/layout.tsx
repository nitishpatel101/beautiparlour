import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nitishsalon.com"),
  title: "Nitish Salon — Bridal & Beauty Atelier | Haute Couture Transformation",
  description:
    "Experience the cinematic bridal metamorphosis at Nitish Salon. A bespoke editorial journey through luxury hair restorative care, couture makeup, and traditional Indian bridal adornment.",
  keywords: [
    "Nitish Salon",
    "Bridal Atelier",
    "Luxury Bridal Makeup",
    "Indian Bride Transformation",
    "Couture Hair Styling",
    "Bridal Jewellery Adornment",
  ],
  authors: [{ name: "Nitish Salon Atelier" }],
  openGraph: {
    title: "Nitish Salon — Bridal & Beauty Atelier",
    description:
      "A cinematic scroll-driven bridal journey through restorative salon care, master artistry, and royal bridal adornment.",
    type: "website",
    locale: "en_US",
    siteName: "Nitish Salon",
    images: [
      {
        url: "/images/scene5_final.webp",
        width: 1600,
        height: 900,
        alt: "Nitish Salon Bridal Final Look",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Salon — Bridal & Beauty Atelier",
    description:
      "A cinematic scroll-driven bridal journey through restorative salon care, master artistry, and royal bridal adornment.",
    images: ["/images/scene5_final.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-[#faf7f2] font-sans-luxury selection:bg-[#d4af37]/30 selection:text-[#faf7f2]">
        {children}
      </body>
    </html>
  );
}
