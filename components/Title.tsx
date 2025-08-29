"use client"

import { motion } from "framer-motion"

interface TitleProps {
  heading?: string
  highlight?: string
  subheading?: string
  className?: string
}

const Title = ({
  heading,
  highlight,
  subheading,
  className = "text-4xl md:text-5xl",
}: TitleProps) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className={`${className} font-bold text-gray-800 mb-4`}>
        {heading}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
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
