"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Header from "../auth/header"
import Title from "../auth/Title"
import { CodeFormData, codeSchema } from "@/validations/auth"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useVerifyEmail, useResendCode } from "@/hooks/useAuth"

export default function VerificationForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  // Debug: Check if email is received
  useEffect(() => {
    console.log("📧 Email from URL:", email)
    if (!email) {
      console.error("⚠️ No email found in URL!")
    }
  }, [email])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  })

  const [timer, setTimer] = useState(0)

  // ✅ Hook for verification
  const verifyEmailMutation = useVerifyEmail()
  // ✅ Hook for resend
  const resendVerificationMutation = useResendCode()

  // Handle submit
  const onSubmit = (data: CodeFormData) => {
    console.log("🔍 Submitting verification:", { email, code: data.code })
    
    if (!email) {
      alert("Email is missing! Please go back and sign up again.")
      return
    }
    
    verifyEmailMutation.mutate({ email, code: data.code })
  }

  // Handle resend
  const handleResend = () => {
    resendVerificationMutation.mutate(email)
    setTimer(30)
  }

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
      >
        <div className="flex flex-col md:flex-row md:h-[calc(100vh-2rem)]">
          {/* Left header */}
          <Header
            title="Verify Email"
            subTitle="Secure your account with verification"
          />

          {/* Right side */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Title
                title="Check your email"
                subTitle={`We’ve sent a 6-digit verification code to ${email}. Enter it below to continue.`}
              />

              <Input
                id="code"
                type="text"
                label="Verification Code"
                placeholder="Enter 6-digit code"
                {...register("code")}
                error={errors.code?.message}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="xl"
                  className="w-full rounded-full"
                  disabled={verifyEmailMutation.isPending}
                >
                  {verifyEmailMutation.isPending ? "Verifying..." : "Verify"}
                </Button>
              </div>

              {/* Resend option */}
              <p className="text-sm text-center text-foreground/60 mt-4">
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-accent hover:text-primary font-medium"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
