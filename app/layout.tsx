import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creator Income Calculator",
  description:
    "Model your creator business – test how product pricing, video performance, conversion rates and posting schedule shape your path to revenue.",
  keywords: ["creator", "youtube", "income calculator", "revenue", "business model", "conversion rates"],
  authors: [{ name: "Chet Callahan" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Creator Income Calculator",
    description:
      "Model your creator business – test how product pricing, video performance, conversion rates and posting schedule shape your path to revenue.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creator Income Calculator - Model your creator business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Income Calculator",
    description:
      "Model your creator business – test how product pricing, video performance, conversion rates and posting schedule shape your path to revenue.",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
