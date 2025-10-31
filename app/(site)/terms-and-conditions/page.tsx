"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs md:text-sm text-foreground/60 mb-3 md:mb-4 tracking-wide uppercase">
              CLIPPY
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              TERMS OF <span className="text-accent">SERVICE</span>
            </h1>
            <div className="w-24 md:w-32 h-1 bg-primary mx-auto"></div>
          </motion.div>
        </div>
      </div>

  

      {/* Content Section */}
      <div className="max-w-4xl mt-3 mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Introduction */}
          <div className="prose prose-sm md:prose-base max-w-none">
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-4 md:mb-6">
              Welcome to <span className="font-semibold text-primary">Clippy</span>, an AI-powered content generation platform that helps users create scripts, voices, and images quickly and efficiently.
            </p>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              By accessing or using Clippy, you agree to the following Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Section 1 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              1. Use of Service
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                Clippy provides AI-based tools for generating digital content, including text, voice, and images.
              </p>
              <p>
                You agree to use these services only for lawful purposes and in compliance with all applicable laws and regulations.
              </p>
              <p>
                You are responsible for all activity conducted under your account and for any content generated using Clippy.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              2. User Accounts
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                To use certain features, you must create an account using your email or Google login.
              </p>
              <p>
                You agree to provide accurate and complete information and to keep your login credentials secure.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              3. Subscription & Payments
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                Some features of Clippy require a paid plan or subscription.
              </p>
              <p>
                By purchasing a subscription, you authorize us to charge your payment method according to the plan you select.
              </p>
              <p>
                All fees are non-refundable except as required by law.
              </p>
              <p>
                Clippy reserves the right to change pricing or plans with prior notice.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              4. Intellectual Property
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                All intellectual property related to Clippy — including design, software, branding, and AI systems — remains the sole property of ClippyGen Inc.
              </p>
              <p>
                Users retain ownership of the content they create using Clippy but grant Clippy a limited license to store and process it for service functionality.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              5. Prohibited Use
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>You agree not to use Clippy for:</p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2">
                <li>Generating or distributing harmful, misleading, or illegal content.</li>
                <li>Violating the intellectual property rights of others.</li>
                <li>Attempting to reverse engineer or misuse the AI systems.</li>
              </ul>
              <p>
                Violation of these terms may result in suspension or termination of your account.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              6. Disclaimer
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                Clippy provides AI-generated content for creative and productivity purposes.
              </p>
              <p>
                We do not guarantee accuracy, completeness, or reliability of generated results.
              </p>
              <p>
                Use outputs responsibly and verify important information before publishing or distribution.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              7. Limitation of Liability
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                Clippy and its affiliates shall not be held liable for any damages resulting from the use or inability to use our platform, including data loss or content misuse.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              8. Termination
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                We reserve the right to suspend or terminate access to our services at any time, without prior notice, if we suspect violation of these terms.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              9. Changes to Terms
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                We may update these Terms from time to time. Continued use of Clippy after changes constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>

          {/* Section 10 - Contact */}
          <div className="border-l-4 border-accent pl-4 md:pl-6 py-2 bg-accent/5 rounded-r-lg">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
              10. Contact Us
            </h2>
            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>For questions about these Terms, contact us at:</p>
              <a
                href="mailto:support@clippygen.com"
                className="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-primary hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                support@clippygen.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
