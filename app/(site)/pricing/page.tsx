"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Title from "@/components/Title"

const plans = [
  {
    name: "Free",
    price: 0,
    period: "month",
    yearlyPrice: 0,
    description: "Perfect for trying out Clippy",
    icon: Star,
    features: [
      "10 voice generations per month",
      "5 minutes of audio per month",
      "Basic voice selection",
      "Standard quality output",
      "Community support",
    ],
    limitations: ["Clippy watermark included", "No commercial usage rights", "Limited voice styles"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Creator",
    price: 19,
    period: "month",
    yearlyPrice: 190,
    description: "For content creators and freelancers",
    icon: Zap,
    features: [
      "500 voice generations per month",
      "10 hours of audio per month",
      "50+ premium voices",
      "High-quality output",
      "Email support",
      "No watermark",
      "Commercial usage rights",
      "Voice speed control",
      "Multiple export formats",
    ],
    buttonText: "Start Creating",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Business",
    price: 49,
    period: "month",
    yearlyPrice: 490,
    description: "For growing businesses and teams",
    icon: Building,
    features: [
      "Unlimited voice generations",
      "50 hours of audio per month",
      "100+ premium voices",
      "Ultra-high quality output",
      "Priority support",
      "Team collaboration (5 seats)",
      "Advanced voice customization",
      "API access",
      "Custom voice cloning (3 voices)",
      "Analytics dashboard",
      "White-label options",
    ],
    buttonText: "Scale Your Business",
    buttonVariant: "default" as const,
    popular: false,
  },
  {
    name: "Enterprise",
    price: null,
    period: "custom",
    yearlyPrice: null,
    description: "For large organizations",
    icon: Crown,
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "Custom voice development",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantees",
      "On-premise deployment",
      "Custom integrations",
      "Advanced security features",
      "Training and onboarding",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What happens if I exceed my monthly limits?",
    answer:
      "You'll receive notifications as you approach your limits. You can either upgrade your plan or purchase additional credits to continue using the service.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Can I use generated voices commercially?",
    answer:
      "Yes, all paid plans include commercial usage rights. The free plan is for personal use only and includes a watermark.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-14 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Title
            heading="Simple, Transparent"
            highlight="Pricing"
            subheading="Choose the perfect plan for your voice generation needs. Start free and scale as you grow."
          />

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-secondary"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? "bg-accent" : "bg-border"}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? "translate-x-8" : "translate-x-1"
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-secondary"}`}>Yearly</span>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Save 20%
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-card rounded-2xl p-8 border transition-all hover:shadow-lg ${plan.popular ? "border-accent shadow-lg scale-105" : "border-border hover:border-accent/50"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-foreground/80 mb-4">{plan.description}</p>

                  <div className="mb-4">
                    {plan.price !== null ? (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-primary">
                            ${isYearly ? plan.yearlyPrice : plan.price}
                          </span>
                          <span className="text-foreground/80">/{isYearly ? "year" : plan.period}</span>
                        </div>
                        {isYearly && plan.yearlyPrice && (
                          <p className="text-sm text-foreground/80 mt-1">
                            ${Math.round(plan.yearlyPrice / 12)}/month billed annually
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-primary">Custom</div>
                    )}
                  </div>

                  <Button
                    className={`w-full ${plan.buttonVariant === "default"
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "border-accent text-accent hover:bg-accent hover:text-white"
                      }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">What`&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                    
                  {plan.limitations && (
                    <div className="pt-4 border-t border-border">
                      <h5 className="text-sm font-medium text-primary mb-2">Limitations:</h5>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-sm text-foreground/80">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Title
            heading="Frequently Asked"
            highlight="Questions"
            subheading="Everything you need to know about our pricing and plans"
          />
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
