"use client"

import Card from "@/components/Card"
import Title from "@/components/Title"
import { team } from "@/data/Team"
import { motion } from "framer-motion"
import Image from "next/image"


const stats = [
  {
    number: "10M+",
    title: "Voices Generated",
    subtitle: "Across 50+ languages",
  },
  {
    number: "500K+",
    title: "Happy Users",
    subtitle: "Worldwide",
  },
  {
    number: "99.9%",
    title: "Uptime",
    subtitle: "Reliable service",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-14 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Title
            heading="About"
            highlight="Clippy"
            subheading="We're revolutionizing content creation with AI-powered text-to-voice technology that makes professional voiceovers accessible to everyone."
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mission Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                At Clippy, our mission is simple
                to unlock limitless creativity for everyone, everywhere. We believe AI should make content creation faster, more affordable, and more enjoyable. Whether you’re a solo creator, a startup, or an established brand, Clippy gives you the tools to create content that stands out.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                We&apos;re driven by innovation, guided by simplicity, and inspired by you—the creators shaping the future.
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border"
            >
              <div className="space-y-6">
                {stats.map((stat) => (
                  <div key={stat.title} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{stat.number}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                      <h3 className="font-semibold text-primary">{stat.title}</h3>
                      <p className="text-foreground/80">{stat.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Title
            heading="Our"
            highlight="Values"
            subheading="The principles that guide everything we do at Clippy"
          />

          <Card
            type="about"
          />

        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Title
            heading="Meet Our"
            highlight="Team"
            subheading="The passionate individuals behind Clippy's innovation"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border text-center hover:border-accent transition-colors"
              >
                <div className="w-18 h-18 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={260}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-1">{member.role}</p>
                <p className="text-foreground/80 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
