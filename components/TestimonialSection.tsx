"use client"

import { motion } from "framer-motion"
import {Quote } from "lucide-react"
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
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Title
          heading="What Our"
          highlight="Customers Say"
          subheading="Join thousands of satisfied customers who trust Clippy for their voice generation needs"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-accent/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-accent/10 relative overflow-hidden">

                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-20">
                  <Quote className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 font-medium">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Profile section */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-accent/20"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-card"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
                        <p className="text-foreground/60 text-sm font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}