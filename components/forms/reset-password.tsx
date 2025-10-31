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
import { CheckCircle, ArrowLeft, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { showToast } from "@/lib/toast"

const resetPasswordSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .refine((email) => email.endsWith("@gmail.com"), {
            message: "Only Gmail addresses are allowed",
        }),
    code: z.string().min(6, "Code must be 6 digits").max(6, "Code must be 6 digits"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
    const [isSuccess, setIsSuccess] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    code: data.code,
                    newPassword: data.newPassword,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                setIsSuccess(true)
                showToast.success(result.message || 'Password reset successfully')
                setTimeout(() => {
                    router.push('/auth/login')
                }, 3000)
            } else {
                // Handle validation or other errors
                showToast.error(result.message || 'Failed to reset password')
            }
        } catch (error) {
            console.error('Reset password error:', error)
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
                        {!isSuccess ? (
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
                                <p className="text-sm text-foreground/60 mt-1">
                                    Enter the code sent to your email and choose a new password
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground">Password Reset!</h1>
                                <p className="text-sm text-foreground/60 mt-1">
                                    Your password has been successfully reset. Redirecting to login...
                                </p>
                            </div>
                        )}
                    </div>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                {...register("email")}
                                error={errors.email?.message}
                            />

                            <Input
                                id="code"
                                type="text"
                                label="Verification Code"
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                {...register("code")}
                                error={errors.code?.message}
                            />

                            <Input
                                id="newPassword"
                                type="password"
                                label="New Password"
                                placeholder="Enter new password"
                                {...register("newPassword")}
                                error={errors.newPassword?.message}
                            />

                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword")}
                                error={errors.confirmPassword?.message}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                                size="lg"
                            >
                                Reset Password
                            </Button>

                            <div className="text-center">
                                <Link
                                    href="/auth/forgot-password"
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Resend Code
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm text-foreground/60 mb-4">
                                You can now login with your new password
                            </p>
                            <Link href="/auth/login">
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90"
                                    size="lg"
                                >
                                    Go to Login
                                </Button>
                            </Link>
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
                        <Lock className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">Secure Your Account</h2>
                    <p className="text-white/80 text-lg">
                        Choose a strong password to keep your account safe and secure.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
