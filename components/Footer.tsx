"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import Link from "next/link"

const footerLinks = {
  Product: ["Features", "Pricing", "API", "Documentation"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Help Center", "Community", "Tutorials", "Status"],
  Legal: ["Privacy", "Terms & Conditions", "Security", "Compliance"],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto pl-10 pr-4 pt-20 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Logo />
              <p className="text-foreground/80 mt-3 mb-6 leading-relaxed">
                The most advanced AI voice generator for creating ultra-realistic voiceovers in seconds. Transform your
                content with human-like speech.
              </p>
              <Button
                variant="destructive"
              >
                Get Started Free
              </Button>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    {link === "Terms & Conditions" ? (
                      <Link href="/terms-and-conditions" className="text-foreground/80 hover:text-primary transition-colors">
                        {link}
                      </Link>
                    ) : (
                      <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} Clippy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
