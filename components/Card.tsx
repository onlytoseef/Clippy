"use client"
import { features } from '@/data/Features'
import { values } from '@/data/Values'
import { motion } from "framer-motion"

const Card = ({ type }: { type: string }) => {
    const data = type === "home" ? features : values;
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.map((feature, index) => {
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
                            <div className={`mb-6 p-2 ${type === "home" ? "bg-muted hover:bg-primary/10" : "bg-accent hover:bg-accent/80"} rounded-lg transition-colors w-fit`}>
                                <Icon className={`w-8 h-8 ${type === "home" ? "text-primary" : "text-white"}`} />
                            </div>

                            <h3 className={`text-xl font-bold ${type === "home" ? "text-foreground" : "text-primary"} mb-4`}>
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
    )
}

export default Card
