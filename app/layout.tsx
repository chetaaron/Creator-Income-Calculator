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
  openGraph: {
    title: "Creator Income Calculator",
    description:
      "Model your creator business – test how product pricing, video performance, conversion rates and posting schedule shape your path to revenue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Income Calculator",
    description:
      "Model your creator business – test how product pricing, video performance, conversion rates and posting schedule shape your path to revenue.",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
