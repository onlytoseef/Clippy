"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Mail, ArrowLeft } from "lucide-react"
import { showToast } from "@/lib/toast"

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .refine((email) => email.endsWith("@gmail.com"), {
            message: "Only Gmail addresses are allowed",
        }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setEmail(data.email)
                setIsSubmitted(true)
                showToast.success(result.message || 'Reset code sent to your email')
            } else {
                // Handle validation or other errors
                showToast.error(result.message || 'Failed to send reset code')
            }
        } catch (error) {
            console.error('Forgot password error:', error)
            showToast.error('Internal server error. Please try again later.')
        }
    }

    return (
        <div className="h-screen w-full flex overflow-hidden bg-gradient-hero">
            {/* Left side - Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 xl:px-16"
            >
                <div className="w-full max-w-md mx-auto space-y-6">
                    {/* Logo and Title */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <Image src="/logo.webp" alt="Logo" width={100} height={100} />
                        </div>
                        {!isSubmitted ? (
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Forgot Password?</h1>
                                <p className="text-sm text-foreground/60 mt-1">
                                    No worries! Enter your email and we'll send you a reset code.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground">Check Your Email</h1>
                                <p className="text-sm text-foreground/60 mt-1">
                                    We've sent a verification code to <span className="font-semibold text-foreground">{email}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                {...register("email")}
                                error={errors.email?.message}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                                size="lg"
                            >
                                Send Reset Code
                            </Button>

                            <div className="text-center">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                                <p className="text-sm text-foreground/80">
                                    Didn't receive the code? Check your spam folder or{' '}
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-primary hover:text-accent font-semibold underline"
                                    >
                                        try again
                                    </button>
                                </p>
                            </div>

                            <Link href="/auth/reset-password">
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90"
                                    size="lg"
                                >
                                    Continue to Reset Password
                                </Button>
                            </Link>

                            <div className="text-center">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Right side - Image/Illustration */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 items-center justify-center p-12"
            >
                <div className="max-w-md text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">Password Recovery</h2>
                    <p className="text-white/80 text-lg">
                        Don't worry! It happens to the best of us. We'll help you get back into your account.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
