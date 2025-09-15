"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import Title from "@/components/Title"
import { contactInfo } from "@/data/Contact"
import { ContactFormData, contactSchema } from "@/validations/contact"



export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Title
            heading="Get in"
            highlight="Touch"
            subheading="Have questions about Clippy? Need help with your account? We're here to help you succeed with AI-powered
            voice generation."
          />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-3">Send us a Message</h2>
              <p className="text-lg text-forground/80 mb-8 leading-relaxed">
                Fill out the form below and we&apos;ll get back to you within 24 hours. For urgent matters, please call us
                directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Quick Response</h3>
                    <p className="text-foreground/80">We typically respond within 2-4 hours during business hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Expert Support</h3>
                    <p className="text-foreground/80">Our team includes AI specialists and voice technology experts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Personalized Help</h3>
                    <p className="text-foreground/80">We provide tailored solutions based on your specific needs.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 border border-border"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Full Name *"
                    placeholder="Your full name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email Address *"
                    placeholder="your@email.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <Input
                  id="company"
                  label="Company (Optional)"
                  placeholder="Your company name"
                  error={errors.company?.message}
                  {...register("company")}
                />

                <Input
                  id="subject"
                  label="Subject *"
                  placeholder="What can we help you with?"
                  error={errors.subject?.message}
                  {...register("subject")}
                />

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent transition-colors text-center"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
                <p className="text-primary font-medium mb-1">{info.details}</p>
                <p className="text-foreground/80 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
