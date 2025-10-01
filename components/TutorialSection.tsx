"use client"

import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"
import { AnimatedWaves } from "./animations/AnimatedWaves"

export function TutorialVideoSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedWaves />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Clippy <span className="text-accent">Tutorial</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Learn to create professional content with our AI voice platform
            </p>
          </motion.div>
        </div>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative">
              {/* Video Placeholder */}
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-accent/90 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-foreground/70">Click to play introduction video</p>
              </div>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div>
                  <h3 className="text-primary font-semibold text-lg">Getting Started with AI Voice Studio</h3>
                  <p className="text-primary/80 text-sm">Complete platform overview</p>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    10:24
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}