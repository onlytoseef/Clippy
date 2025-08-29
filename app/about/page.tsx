"use client"

import Title from "@/components/Title"
import { motion } from "framer-motion"
import { Users, Target, Award, Zap } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description:
      "We push the boundaries of AI voice technology to deliver cutting-edge solutions that transform how you create content.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description:
      "Every feature is designed with our users in mind, ensuring intuitive experiences and powerful results.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We maintain the highest standards in voice quality, ensuring every generated voice sounds natural and professional.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Our advanced AI processes deliver high-quality voice generation in seconds, not hours.",
  },
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image: "/professional-woman-avatar.png",
    description: "Former AI researcher at Google with 10+ years in voice technology.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    image: "/profile-img4.webp",
    description: "Machine learning expert who led voice AI projects at Microsoft.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    image: "/profile-img5.webp",
    description: "Product strategist with expertise in user experience and AI applications.",
  },
]

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
      <section className="pt-32 pb-10 px-4">
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
                At Clippy, we believe that everyone should have access to professional-quality voice content.
                Our mission is to democratize voice technology, making it simple for creators, businesses,
                and individuals to produce engaging audio content without the traditional barriers of cost and complexity.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                We&apos;re building the future of content creation, where your ideas can be brought to life with just a few clicks.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">{value.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
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
