import type React from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import "./globals.css"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Clippy - AI Voice Generator",
  icons: {
    icon: "/logo.webp",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
