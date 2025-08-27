"use client"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { MessageCircle } from 'lucide-react'

export const ContactSupport = () => {
    return (
        <motion.div
            className="text-center mt-10 p-8 bg-card rounded-2xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
        >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Still have questions?
            </h3>
            <p className="text-card-foreground/70 mb-6">
                Our support team is here to help you get the most out of Clippy
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                    size="xl"
                    className="bg-primary text-white hover:opacity-90 transition-opacity">
                    Contact Support
                </Button>
                <Button
                    size="xl"
                    variant="destructive"
                >
                    Browse Help Center
                </Button>
            </div>
        </motion.div>
    )
}
