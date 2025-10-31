"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Image, Zap, TrendingUp } from "lucide-react"

const thumbnails = [
  {
    id: 1,
    thumbnail: "/img1.png"
  },
  {
    id: 2,
    thumbnail: "/img2.jpg"
  },
  {
    id: 3,
    thumbnail: "/img3.jpg"
  },
  {
    id: 4,
    thumbnail: "/img4.webp"
  },
  {
    id: 5,
    thumbnail: "/img5.png"
  },
  {
    id: 6,
    thumbnail: "/profile-img1.webp"
  },
  {
    id: 7,
    thumbnail: "/profile-img2.webp"
  },
  {
    id: 8,
    thumbnail: "/profile-img3.webp"
  }
]

export default function ThumbnailShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const topRow = thumbnails.slice(0, 4)
  const bottomRow = thumbnails.slice(4, 8)

  return (
    <section className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
           {/* Content */}
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 sm:space-y-6 max-w-3xl"
          >
            <div className="space-y-3 sm:space-y-4">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Create Viral{" "}
                Imagess
                <br />
                <span className="text-accent">in Seconds</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Generate high-converting Imagess that drive millions of views. 
              Powered by AI, proven by results.
            </p>

            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-base md:text-lg px-8 md:px-10 py-6 md:py-7 group shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Animated Thumbnails */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top Row - Tilted Up */}
            <motion.div
              className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 justify-center"
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
              {topRow.map((thumb, index) => (
                <ThumbCard
                  key={thumb.id}
                  thumb={thumb}
                  index={index}
                  isTopRow={true}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              ))}
            </motion.div>

            {/* Bottom Row - Tilted Down */}
            <motion.div
              className="flex gap-2 sm:gap-3 md:gap-4 justify-center"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            >
              {bottomRow.map((thumb, index) => (
                <ThumbCard
                  key={thumb.id}
                  thumb={thumb}
                  index={index + 4}
                  isTopRow={false}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface ThumbCardProps {
  thumb: typeof thumbnails[0]
  index: number
  isTopRow: boolean
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
}

function ThumbCard({ thumb, index, isTopRow, hoveredId, setHoveredId }: ThumbCardProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{
        opacity: 0,
        y: isTopRow ? 40 : -40,
        rotateZ: isTopRow ? -4 : 4
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateZ: isTopRow ? -3 : 3
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.15,
        y: isTopRow ? -12 : 12,
        rotateZ: 0,
      }}
      animate={{
        y: isTopRow ? [-6, -10, -6] : [6, 10, 6],
      }}
      onHoverStart={() => setHoveredId(thumb.id)}
      onHoverEnd={() => setHoveredId(null)}
    >
      {/* Thumbnail Image Container */}
      <div className="w-24 sm:w-32 md:w-36 lg:w-44 aspect-[16/10] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/20 sm:border-2 bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-sm relative">
        <img
          src={thumb.thumbnail}
          alt={`Thumbnail ${thumb.id}`}
          className="w-full h-full object-cover"
        />
      </div>


      {/* Hover Particles */}
      {hoveredId === thumb.id && (
        <>
          <motion.div
            className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <motion.div
            className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-accent rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
        </>
      )}
    </motion.div>
  )
}