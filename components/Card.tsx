"use client"
import { features } from "@/data/Features"
import { stats } from "@/data/Stats"
import { values } from "@/data/Values"
import { motion } from "framer-motion"
import AnimatedNumber from "./animations/AnimatedNumber"
import { cn } from "@/lib/utils"

const Card = ({ type }: { type: "stats" | "home" | "about" }) => {
    const data =
        type === "stats" ? stats : type === "home" ? features : values

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.map((feature: any, index) => {
                const Icon = feature.icon

                return (
                    <motion.div
                        key={feature.id}
                        className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="relative z-10">
                            <div className="flex gap-2">
                                <div
                                    className={cn(
                                        "mb-6 p-2 rounded-lg transition-colors w-fit",
                                        type === "home" && "bg-muted hover:bg-primary/10",
                                        type === "about" && "bg-accent hover:bg-accent/80",
                                        type === "stats" && "bg-muted mb-4"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "w-8 h-8",
                                            type === "stats" && `${feature.color} h-6 w-6`,
                                            type === "home" && "text-primary",
                                            type === "about" && "text-white"
                                        )}
                                    />
                                </div>

                                {type === "stats" && (
                                    <div className={cn("text-2xl md:text-3xl font-bold", feature.color)}>
                                        <AnimatedNumber number={feature.number} suffix={feature.suffix} />
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h3
                                className={cn(
                                    "text-xl font-bold mb-4",
                                    type === "stats" && "text-foreground mb-1",
                                    type === "home" && "text-foreground",
                                    type === "about" && "text-primary"
                                )}
                            >
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-card-foreground/80 leading-relaxed text-sm group-hover:text-card-foreground/90 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Card
