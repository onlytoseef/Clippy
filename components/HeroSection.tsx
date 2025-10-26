"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VoiceDemoCard } from "./VideoDemoCard"
import { AnimatedWaves } from "./animations/AnimatedWaves"
import Title from "./Title"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedWaves />

      <div className="relative z-10 container mx-auto px-4 pt-14 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Title
            heading="AI Voice Generator with Ultra-Realistic"
            highlight="AI Voices"
            subheading="EGenerate human-like voiceovers with our AI voice generator built on our second generation text to speech model. Use our low-latency TTS model to create voice AI agents, audio products, training & marketing voiceovers, podcasts, and much more."
            isHero = {true}
          />

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="xl"
              variant="destructive">
              Open Studio
            </Button>

            <Button
              variant="outline"
              className="bg-secondary"
              size="xl">
              Contact Sales
            </Button>

           
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <VoiceDemoCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
