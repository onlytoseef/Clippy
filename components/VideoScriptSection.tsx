"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, Clock, Sparkles, FileText } from "lucide-react"

const scriptExamples = [
  {
    id: 1,
    title: "Vietnam Travel Guide",
    prompt: "Write me a script about Vietnam...",
    duration: "3:45",
    style: "Documentary"
  },
  {
    id: 2,
    title: "Luxury Holidays",
    prompt: "A script about luxury travel...",
    duration: "2:15",
    style: "Luxury"
  },
  {
    id: 3,
    title: "Skateboard Ad",
    prompt: "Script for Skateboard role...",
    duration: "1:30",
    style: "Commercial"
  }
]

export default function VideoScriptGenerator() {
  const [selectedScript, setSelectedScript] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <section className="relative min-h-screen py-20 px-14 flex items-center justify-center bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Generate Video Scripts{" "}
                <span className="text-primary font-semibold tracking-wider text-7xl">Quickly</span>
              </h1>

              <p className="text-xl text-foreground/70 leading-relaxed">
                Create professional video scripts in seconds with AI.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {[
                { value: "10k+", label: "Scripts" },
                { value: "98%", label: "Satisfaction" },
                { value: "2.4M", label: "Avg. Views" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 rounded-xl"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Generate Script
                  </div>
                )}
              </Button>

              <div className="flex items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Proven results</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Simple Script Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {scriptExamples.map((script, index) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedScript === script.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/30'
                  }`}
                onClick={() => setSelectedScript(script.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-foreground">{script.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Clock className="w-4 h-4" />
                    <span>{script.duration}</span>
                  </div>
                </div>

                <p className="text-foreground/70 mb-3 italic">&quot;{script.prompt}&quot;</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">{script.style}</span>
                  <FileText className="w-5 h-5 text-foreground/60" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}