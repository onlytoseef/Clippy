"use client"

import { motion } from "framer-motion"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useRef } from "react"
import Title from "./Title"
import { voices } from "@/data/Voice"
import Image from "next/image"

export function VoicesSection() {
    const [playingVoice, setPlayingVoice] = useState<string | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handlePlayPause = (voiceId: string) => {
        setPlayingVoice((prev) => (prev === voiceId ? null : voiceId))
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    return (
        <section className="pt-16 pb-8 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <Title
                    heading="Choose Your Perfect"
                    highlight="Voice"
                    subheading="Discover our collection of ultra-realistic AI voices. Each voice is carefully crafted to deliver natural, human-like speech for any project."
                />

                {/* Navigation controls */}
                <div className="flex justify-end items-center mb-6 -mt-10">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollLeft}
                            className="rounded-full border-border/60"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollRight}
                            className="rounded-full border-border/60"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Horizontal scrolling container */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {voices.map((voice, index) => (
                        <motion.div
                            key={voice.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="min-w-[320px] max-w-[320px] snap-start flex-shrink-0"
                        >
                            <Card
                                className="p-5 h-full bg-card/90 border border-border/50
                              backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl 
                              hover:-translate-y-1 transition-all duration-300 group
                               relative overflow-hidden"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="relative flex-shrink-0">
                                        <Image
                                            src={voice.avatar || "/placeholder.svg"}
                                            alt={voice.name}
                                            width={260}
                                            height={260}
                                            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/40 group-hover:ring-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-foreground truncate">{voice.name}</h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {voice.character} • {voice.accent} • {voice.age}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                                    {voice.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {voice.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => handlePlayPause(voice.id)}
                                    variant="default"
                                    size="sm"
                                >
                                    {playingVoice === voice.id ? (
                                        <>
                                            <Pause className="w-3.5 h-3.5 mr-1.5" />
                                            Stop
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-3.5 h-3.5 mr-1.5" />
                                            Preview
                                        </>
                                    )}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-6"
                >
                    <Button
                        variant="default"
                        className="px-6"
                    >
                        Explore all voices
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}