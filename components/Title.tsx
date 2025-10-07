"use client"

import { motion } from "framer-motion"

interface TitleProps {
  heading?: string
  highlight?: string
  subheading?: string
  className?: string
  isHero?: boolean
}

const Title = ({
  heading,
  highlight,
  subheading,
  className = "",
  isHero = false,
}: TitleProps) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className={`${className} font-bold text-foreground mb-4 ${isHero ? "text-7xl" : "text-4xl md:text-5xl"}`}>
        {heading}{" "}
        {highlight && <span className={`font-semibold ${isHero ? "text-7xl" : "text-5xl md:text-[55px]"}  tracking-wider text-accent`}>{highlight}</span>}
      </h2>
      {subheading && (
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          {subheading}
        </p>
      )}
    </motion.div>
  )
}

export default Title
