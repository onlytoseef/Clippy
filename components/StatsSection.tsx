"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import Title from "./Title"
import { stats } from "@/data/Stats"

function AnimatedNumber({ number, suffix }: { number: number; suffix: string }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (count < number) {
                setCount(Math.min(count + Math.ceil(number / 50), number))
            }
        }, 50)
        return () => clearTimeout(timer)
    }, [count, number])

    return (
        <span>
            {count === number && number % 1 !== 0 ? number.toFixed(1) : Math.floor(count)}
            {suffix}
        </span>
    )
}

export function StatsSection() {
    return (
        <section className="py-10 bg-background">
            <div className="container mx-auto px-4">
                <Title
                    heading="The Best"
                    highlight="AI Voice Generator"
                    subheading="Transform your content creation with industry-leading technology"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                                    <AnimatedNumber number={stat.number} suffix={stat.suffix} />
                                </div>
                            </div>

                            <h3 className="text-base font-semibold text-card-foreground mb-2">
                                {stat.label}
                            </h3>

                            <p className="text-sm text-card-foreground/70">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p className="text-foreground/70 mb-3">
                        Ready to get started?
                    </p>
                    <Button
                        variant="default"
                    >
                        Start creating now
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}