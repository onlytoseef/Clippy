"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "./Logo"
import Link from "next/link"

export function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Products", href: "/products", dropdown: true },
    { label: "Integrations", href: "/integrations", dropdown: true },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Menu links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ label, href, dropdown }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer transition-colors"
              >
                <span>{label}</span>
                {dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-foreground hover:bg-primary hover:text-white">
              Contact Sales
            </Button>
            <Button variant="ghost" className="text-foreground hover:bg-primary hover:text-white">
              Login
            </Button>
            <Button variant="default">Sign Up</Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
