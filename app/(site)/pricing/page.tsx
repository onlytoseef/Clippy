"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Title from "@/components/Title"
import FaqList from "@/components/FaqList"
import { plans } from "@/data/PricingPlans"

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

          <FaqList
            type="pricing"
          />
        </div>
      </section>
    </div>
  )
}
