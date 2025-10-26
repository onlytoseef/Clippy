'use client'
import { usePathname } from "next/navigation"
import { Footer } from "./Footer"

export function ConditionalFooter() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  // Don't render footer on dashboard pages
  if (isDashboard) {
    return null
  }

  return <Footer />
}