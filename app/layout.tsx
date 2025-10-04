import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ConditionalFooter } from "@/components/ConditionalFooter"

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Nunito:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ConditionalFooter />
      </body>
    </html>
  )
}
