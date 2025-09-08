"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormData, signUpSchema } from "@/validations/auth"
import Image from "next/image"

export default function SignUpForm() {
    const [step, setStep] = useState(0)
    // const [showPassword, setShowPassword] = useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
    })

    const onSubmit = (data: SignUpFormData) => {
        console.log("Form Submitted ✅", data)
    }

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row h-[calc(100vh-2rem)]">
                        {/* Left side */}
                        <div className="w-full md:w-2/5 bg-primary/5 p-8 flex flex-col justify-center items-center">
                            <div className="mb-6">
                                <Image
                                    src="/logo.webp"
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
                            <p className="text-foreground/70 text-sm text-center max-w-xs">
                                Join us to get started
                            </p>
                        </div>

                        {/* Right side */}
                        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-semibold text-primary">Choose Signup Method</h2>
                                            <p className="text-foreground/70 text-sm">Select how you&apos;d like to create your account</p>
                                        </div>
                                        <div className="space-y-4">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="w-full flex justify-between items-center py-3 px-4 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                                            >
                                                <span>Sign up with Email</span>
                                                <ArrowRight className="h-5 w-5 text-foreground/50" />
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full inline-flex justify-center items-center py-3 px-4 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                                            >
                                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                Sign up with Google
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1 - Your Details */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="block text-sm font-medium text-primary">
                                                        First Name
                                                    </label>
                                                    <input
                                                        {...register("firstName")}
                                                        id="firstName"
                                                        type="text"
                                                        className="block w-full px-3 py-3 border border-border rounded-lg"
                                                        placeholder="First name"
                                                    />
                                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="block text-sm font-medium text-primary">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        {...register("lastName")}
                                                        id="lastName"
                                                        type="text"
                                                        className="block w-full px-3 py-3 border border-border rounded-lg"
                                                        placeholder="Last name"
                                                    />
                                                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-primary">
                                                    Email
                                                </label>
                                                <input
                                                    {...register("email")}
                                                    id="email"
                                                    type="email"
                                                    className="block w-full px-3 py-3 border border-border rounded-lg"
                                                    placeholder="Enter your email"
                                                />
                                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-2">
                                            <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-lg">
                                                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                                                Back
                                            </button>
                                            <button type="button" onClick={nextStep} className="px-4 py-2 bg-primary text-white rounded-lg">
                                                Next <ArrowRight className="h-4 w-4 ml-2 inline" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2 - Password */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label htmlFor="password" className="block text-sm font-medium text-primary">
                                                    Password
                                                </label>
                                                <input
                                                    {...register("password")}
                                                    id="password"
                                                    // type={showPassword ? "text" : "password"}
                                                    className="block w-full px-3 py-3 border border-border rounded-lg"
                                                    placeholder="Create a password"
                                                />
                                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    {...register("confirmPassword")}
                                                    id="confirmPassword"
                                                    // type={showConfirmPassword ? "text" : "password"}
                                                    className="block w-full px-3 py-3 border border-border rounded-lg"
                                                    placeholder="Confirm password"
                                                />
                                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-2">
                                            <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-lg">
                                                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                                                Back
                                            </button>
                                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                                                Create Account
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
