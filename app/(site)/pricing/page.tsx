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
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
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
                  className={`relative bg-card rounded-2xl p-5 md:p-6 lg:p-7 border transition-all hover:shadow-lg min-h-[550px] md:min-h-[600px] flex flex-col ${plan.popular
                      ? "border-accent shadow-lg ring-2 ring-accent"
                      : "border-border hover:border-accent/50"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-white px-3 py-1 text-[10px] md:text-xs">
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
                      {plan.name}
                    </h3>

                    <div className="mb-4 md:mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                          {plan.price === 0 ? "Free" : `$${plan.price}`}
                        </p>
                        {plan.price !== 0 && <span className="text-xs md:text-sm text-muted-foreground">/ mo</span>}
                      </div>
                    </div>

                    <Button
                      className={`w-full text-sm md:text-base ${plan.popular
                          ? "bg-accent hover:bg-accent/90 text-white"
                          : "bg-primary hover:bg-primary/90 text-white"
                        }`}
                    >
                      Get Started
                    </Button>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-3 md:space-y-4 flex-grow">
                    <h4 className="font-semibold text-primary mb-3 md:mb-4 text-xs md:text-sm">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-3 md:space-y-4">
                      {/* Script */}
                      {plan.script_credits > 0 && (
                        <li className="flex items-start gap-2 md:gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-1.5 md:p-2 mt-0.5 md:mt-1 flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-foreground font-semibold text-sm md:text-base truncate">
                              Script
                            </p>
                            <p className="text-foreground text-xs md:text-sm font-medium">
                              {plan.script_credits.toLocaleString()} chars
                            </p>
                            {plan.script_description && (
                              <p className="text-muted-foreground text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-2">
                                {plan.script_description}
                              </p>
                            )}
                          </div>
                        </li>
                      )}

                      {/* Voiceover */}
                      {plan.voice_credits > 0 && (
                        <li className="flex items-start gap-2 md:gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-1.5 md:p-2 mt-0.5 md:mt-1 flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-foreground font-semibold text-sm md:text-base truncate">
                              Voiceover
                            </p>
                            <p className="text-foreground text-xs md:text-sm font-medium">
                              {plan.voice_credits.toLocaleString()} credits
                            </p>
                            {plan.voice_description && (
                              <p className="text-muted-foreground text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-2">
                                {plan.voice_description}
                              </p>
                            )}
                          </div>
                        </li>
                      )}

                      {/* Images */}
                      {plan.image_credits > 0 && (
                        <li className="flex items-start gap-2 md:gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-1.5 md:p-2 mt-0.5 md:mt-1 flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-foreground font-semibold text-sm md:text-base truncate">
                              Images
                            </p>
                            <p className="text-foreground text-xs md:text-sm font-medium">
                              {plan.image_credits.toLocaleString()} credits
                            </p>
                            {plan.image_description && (
                              <p className="text-muted-foreground text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-2">
                                {plan.image_description}
                              </p>
                            )}
                          </div>
                        </li>
                      )}

                      {/* Videos */}
                      {plan.video_credits > 0 && (
                        <li className="flex items-start gap-2 md:gap-3">
                          <div className="flex items-center justify-center bg-accent/10 rounded-full p-1.5 md:p-2 mt-0.5 md:mt-1 flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-foreground font-semibold text-sm md:text-base truncate">
                              Videos
                            </p>
                            <p className="text-foreground text-xs md:text-sm font-medium">
                              {plan.video_credits.toLocaleString()} credits
                            </p>
                            {plan.video_description && (
                              <p className="text-muted-foreground text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-2">
                                {plan.video_description}
                              </p>
                            )}
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
