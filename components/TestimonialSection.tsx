"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import Title from "./Title"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "Digital Media Co.",
    content:
      "Clippy has revolutionized our content creation process. The voice quality is indistinguishable from human speech, and the speed is incredible.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content:
      "We've reduced our voiceover costs by 70% while improving quality. The multilingual support has helped us reach global markets effortlessly.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Podcast Producer",
    company: "Audio Waves",
    content:
      "The natural-sounding voices and emotional range make our podcasts more engaging. Our audience can't tell the difference from human narrators.",
    rating: 5,
    avatar: "/professional-woman-avatar-hispanic.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <Title
          heading="What Our"
          highlight="Customers Say"
          subheading="Join thousands of satisfied customers who trust Clippy for their voice generation needs"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={260}
                  height={260}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
