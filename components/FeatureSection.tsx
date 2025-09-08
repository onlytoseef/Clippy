"use client"

import { motion } from "framer-motion"
import { Mic, Zap, Globe, Shield } from "lucide-react"
import Title from "./Title"

const features = [
    {
        icon: Mic,
        title: "Ultra-Realistic Voices",
        description:
            "Generate human-like voiceovers with our advanced AI technology that captures natural speech patterns and emotions.",
        gradient: "from-primary/20 to-accent/20",
        iconBg: "bg-gradient-to-br from-primary to-primary/80"
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description:
            "Get your voiceovers in seconds with our optimized text-to-speech engine built for speed and efficiency.",
        gradient: "from-accent/20 to-primary/20",
        iconBg: "bg-gradient-to-br from-accent to-accent/80"
    },
    {
        icon: Globe,
        title: "120+ Languages",
        description: "Create content in multiple languages with native-sounding voices for global reach and accessibility.",
        gradient: "from-primary/15 to-secondary/30",
        iconBg: "bg-gradient-to-br from-primary/90 to-foreground"
    },
    {
        icon: Shield,
        title: "Enterprise Ready",
        description:
            "Secure, scalable, and reliable infrastructure designed for businesses of all sizes with 99.9% uptime.",
        gradient: "from-foreground/10 to-primary/15",
        iconBg: "bg-gradient-to-br from-foreground/90 to-primary/70"
    },
]

export function FeaturesSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <Title
                    heading="Why Choose"
                    highlight="Clippy"
                    subheading="Experience the future of voice generation with cutting-edge AI technology that delivers
                    professional results in seconds"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="mb-6 p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors w-fit">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>

                                    <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-foreground transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-card-foreground/80 leading-relaxed text-sm group-hover:text-card-foreground/90 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>

                        )
                    })}
                </div>
            </div>
        </section>
    )
}