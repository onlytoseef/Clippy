"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./Logo"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
   
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ label, href,  }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer transition-colors"
              >
                <p>{label}</p>
               
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button
                variant="default"
                size="lg"
              >
                Log In / Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 pt-4 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
              <Link href="/auth/login">
                <Button variant="ghost" className="w-full text-foreground hover:bg-primary hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
