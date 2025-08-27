"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mic, BookOpen, Radio, Headphones, ChevronDown, Play } from "lucide-react"
import Image from "next/image"

const categories = [
  { id: "elearning", label: "E-learning", icon: BookOpen },
  { id: "narration", label: "Narration", icon: Mic },
  { id: "advertisement", label: "Advertisement", icon: Radio },
  { id: "podcast", label: "Podcast", icon: Headphones },
]

export function VoiceDemoCard() {
  const [inputText, setInputText] = useState(
    "Kuch likh kr dekho, Response nhi ana"
  )
  const [selectedCategory, setSelectedCategory] = useState("elearning")

  return (
    <motion.div
      className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-card to-background p-6 shadow-lg border border-border"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon
          const active = selectedCategory === category.id
          return (
            <Button
              key={category.id}
              size="sm"
              variant={active ? "destructive" : "outline"}
              className="rounded-full hover:bg-accent/80 hover:border-none"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          )
        })}
      </div>

      {/* Text Input */}
      <div className="relative bg-muted/40 rounded-2xl p-6 mb-6 border-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground text-lg leading-relaxed resize-none min-h-[100px]"
        />
        {/* Character count */}
        <span className="absolute bottom-4 right-6 text-xs text-muted-foreground">
          {inputText.length} / 500
        </span>
      </div>

      {/* Dropdown Options + Generate */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left side - Language & Voice */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <Button
            variant="outline"
            className="flex-1 md:flex-initial"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/us-flag.png"
                alt="US Flag"
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
              <span>English (US)</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>

          {/* Voice */}
          <Button variant="outline" className="flex-1 md:flex-initial">
            <div className="flex items-center gap-2">
              <Image
                src="/diverse-female-avatar.png"
                alt="Natalie"
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
              <span>Natalie (F)</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Right side - Generate Button */}
        <div className="flex">
          <Button variant="destructive" className="w-full md:w-40">
            <Play className="w-4 h-4" />
            Generate Voice
          </Button>
        </div>
      </div>


    </motion.div>
  )
}
