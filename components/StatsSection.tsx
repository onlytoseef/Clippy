"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import Title from "./Title"
import Card from "./Card"

export function StatsSection() {
    return (
        <section className="py-10 bg-background">
            <div className="container mx-auto px-4">
                <Title
                    heading="The Best"
                    highlight="AI Voice Generator"
                    subheading="Transform your content creation with industry-leading technology"
                />

                <Card
                    type="stats"
                />

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