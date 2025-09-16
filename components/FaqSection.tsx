"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, MessageCircle, Clock, Shield, Globe, Zap } from "lucide-react"
import Title from "./Title"

const faqs = [
  {
    id: 1,
    icon: Zap,
    question: "How does Clippy's AI voice generation work?",
    answer:
      "Clippy uses advanced neural networks trained on thousands of hours of human speech. Simply input your text, choose a voice, and our AI generates natural-sounding audio in seconds. The technology analyzes speech patterns, emotions, and pronunciation to create human-like voiceovers.",
  },
  {
    id: 2,
    icon: Clock,
    question: "What's included in the free trial?",
    answer:
      "Our free trial includes 10,000 characters of text-to-speech conversion, access to 20+ voices, and all basic features. No credit card required. You can upgrade anytime to unlock unlimited characters, premium voices, and advanced features.",
  },
  {
    id: 3,
    icon: Globe,
    question: "Can I use custom voices or clone my own voice?",
    answer:
      "Yes! Our Pro and Enterprise plans include voice cloning technology. Upload a 5-minute sample of your voice, and our AI will create a custom voice model. This feature is perfect for brands wanting consistent voice identity across all content.",
  },
  {
    id: 4,
    icon: Shield,
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption, comply with GDPR and SOC 2 standards, and never store your audio files longer than necessary. All voice processing happens on secure servers, and we never use your data to train our models without explicit consent.",
  },
  {
    id: 5,
    icon: MessageCircle,
    question: "What audio formats are supported?",
    answer:
      "Clippy supports multiple output formats including MP3, WAV, and OGG. You can adjust quality settings from 64kbps to 320kbps, and choose sample rates up to 48kHz for professional-grade audio output.",
  },
  {
    id: 6,
    icon: Globe,
    question: "How many languages do you support?",
    answer:
      "We support 120+ languages and dialects, including English, Spanish, French, German, Japanese, Mandarin, Hindi, and many more. Each language has multiple voice options with different accents and speaking styles.",
  },
]

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(1)

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Title
          heading="Frequently Asked"
          highlight="Questions"
          subheading="Everything you need to know about Clippy's AI voice generation"
        />

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
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
                // const Icon = faq.icon

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
                        <div className="flex items-center gap-4 flex-1 min-w-0">

                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-semibold text-foreground group-hover:text-foreground transition-colors ${isOpen ? "text-foreground" : ""
                                }`}
                            >
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={`p-2 rounded-lg ${isOpen ? "bg-primary/10" : "bg-muted"
                            } transition-colors group-hover:bg-primary/10`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 ${isOpen
                              ? "text-primary"
                              : "text-foreground/60"
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
        </div>
      </div>
    </section>
  )
}
