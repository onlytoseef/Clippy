"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Title from "@/components/Title";
import FaqList from "@/components/FaqList";
import { useGetPlans } from "@/hooks/usePlans";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Pricing } from "@/types/pricing";

export default function PricingPage() {
  const { data = [], isLoading } = useGetPlans();
  const plans = data.plans || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-14 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Title
            heading="Clippy"
            highlight="Pricing"
            subheading="Choose the perfect plan for your content creation needs."
          />
        </div>
      </section>

      {/* Main Subscription Plans */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {isLoading
              ?
              <SkeletonLoader variant="pricing" />
              :
              plans.map((plan: Pricing, index: number) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-card rounded-2xl p-8 border transition-all hover:shadow-lg ${plan.popular
                      ? "border-accent shadow-lg scale-105"
                      : "border-border hover:border-accent/50"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <p className="text-4xl font-bold text-primary">
                          {plan.price === 0 ? "Free" : `$${plan.price}`}
                        </p>
                        {plan.price !== 0 && <span>/ month</span>}
                      </div>
                    </div>

                    <Button
                      className={`w-full ${plan.popular
                          ? "bg-accent hover:bg-accent/90 text-white"
                          : "bg-primary hover:bg-primary/90 text-white"
                        }`}
                    >
                      Get Started
                    </Button>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary mb-4">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-5">
                      {/* Script */}
                      {plan.script_credits > 0 && (
                        <li className="flex items-start gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-2 mt-1">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-foreground font-semibold text-base">
                              Script
                            </p>
                            <div className="flex gap-2 items-center">
                              <p className="text-foreground text-sm font-medium">
                                {plan.script_credits.toLocaleString()} characters
                              </p>
                              {plan.script_description && (
                                <p className="text-foreground/60 text-sm">
                                  ({plan.script_description})
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      )}

                      {/* Voiceover */}
                      {plan.voice_credits > 0 && (
                        <li className="flex items-start gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-2 mt-1">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-foreground font-semibold text-base">
                              Voiceover
                            </p>
                            <div className="flex gap-2 items-center">
                              <p className="text-foreground text-sm font-medium">
                                {plan.voice_credits.toLocaleString()} credits
                              </p>
                              {plan.voice_description && (
                                <p className="text-foreground/60 text-sm">
                                  ({plan.voice_description})
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      )}

                      {/* Images */}
                      {plan.image_credits > 0 && (
                        <li className="flex items-start gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-2 mt-1">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-foreground font-semibold text-base">
                              Images
                            </p>
                            <div className="flex gap-2 items-center">
                              <p className="text-foreground text-sm font-medium">
                                {plan.image_credits.toLocaleString()} credits
                              </p>
                              {plan.image_description && (
                                <p className="text-foreground/60 text-sm">
                                  ({plan.image_description})
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      )}

                      {/* Videos */}
                      {plan.video_credits > 0 && (
                        <li className="flex items-start gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-2 mt-1">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-foreground font-semibold text-base">
                              Videos
                            </p>
                            <div className="flex gap-2 items-center">
                              <p className="text-foreground text-sm font-medium">
                                {plan.video_credits.toLocaleString()} credits
                              </p>
                              {plan.video_description && (
                                <p className="text-foreground/60 text-sm">
                                  ({plan.video_description})
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
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
          <FaqList type="pricing" />
        </div>
      </section>
    </div>
  );
}
