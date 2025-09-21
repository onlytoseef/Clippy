"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { homeFaqs, pricingFaqs } from "@/data/Faqs"


export default function FaqList({type }: {type: string}) {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const faqs = type === "home" ? homeFaqs : pricingFaqs

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {faqs.map((faq, index) => {
          const isOpen = openItem === faq.id

          return (
            <motion.div
              key={faq.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-foreground group-hover:text-foreground transition-colors ${isOpen ? "text-foreground" : ""
                        }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-2 rounded-lg ${isOpen ? "bg-primary/10" : "bg-muted"
                      } transition-colors group-hover:bg-primary/10`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${isOpen ? "text-primary" : "text-foreground/60"
                        } group-hover:text-primary transition-colors`}
                    />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="mx-2 pt-2 border-t border-border/30">
                        <p className="text-card-foreground/80 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
