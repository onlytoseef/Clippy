"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormData, signUpSchema } from "@/validations/auth"
import { Input } from "../ui/input"
import Footer from "../auth/footer"
import Header from "../auth/header"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import Title from "../auth/Title"

export default function SignUpForm() {
    const [step, setStep] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
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
                    <div className="flex flex-col md:flex-row md:h-[calc(100vh-2rem)]">
                        {/* Left side */}
                        <Header
                            title="Create Account"
                            subTitle="Join us to get started"
                        />

                        {/* Right side */}
                        <div className="w-full md:w-3/5 p-5 md:p-8 flex flex-col justify-center">
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
                                        <Title
                                            title="Choose Signup Method"
                                            subTitle="Select how you&apos;d like to create your account"
                                        />
                                        <div className="space-y-4">
                                            <Button
                                                onClick={nextStep}
                                                variant="outline"
                                                size="xl"
                                                className="w-full rounded-full"
                                            >
                                                Sign up with Email
                                                <ArrowRight className="h-5 w-5 text-foreground/50 ml-2" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="xl"
                                                className="w-full rounded-full"
                                            >
                                                <FcGoogle className="w-5 h-5 mr-1" />
                                                Sign up with Google
                                            </Button>
                                        </div>
                                        <Footer
                                            type="signup"
                                        />
                                    </motion.div>
                                )}

                                {/* Step 1 - Your Details */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input
                                                    id="text"
                                                    type="text"
                                                    label="First Name"
                                                    placeholder="First Name"
                                                    {...register("firstName")}
                                                    error={errors.firstName?.message}
                                                />
                                                <Input
                                                    id="text"
                                                    type="text"
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    {...register("lastName")}
                                                    error={errors.lastName?.message}
                                                />
                                            </div>

                                            <Input
                                                id="email"
                                                type="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                                {...register("email")}
                                                error={errors.email?.message}
                                            />

                                        </div>

                                        <div className="flex justify-between pt-2">
                                            <Button
                                                onClick={prevStep}
                                                variant="outline"
                                                size="lg"                                           >
                                                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                                                Back
                                            </Button>

                                            <Button
                                                onClick={nextStep}
                                                variant="default"
                                                size="lg"
                                                className="rounded-lg"
                                            >
                                                Next
                                                <ArrowRight className="h-4 w-4 ml-2 inline" />
                                            </Button>
                                        </div>
                                        <Footer
                                            type="signup"
                                        />
                                    </motion.div>
                                )}

                                {/* Step 2 - Password */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="space-y-6">
                                        <div className="space-y-4">
                                            <Input
                                                id="password"
                                                type="password"
                                                label="Password"
                                                placeholder="Enter your password"
                                                {...register("password")}
                                                error={errors.password?.message}
                                            />

                                            <Input
                                                id="password"
                                                type="password"
                                                label="Confirm Password"
                                                placeholder="Confirm password"
                                                {...register("confirmPassword")}
                                                error={errors.confirmPassword?.message}
                                            />
                                        </div>

                                        <div className="flex justify-between pt-2">
                                            <Button
                                                onClick={prevStep}
                                                variant="outline"
                                                size="lg"                                           >
                                                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                                                Back
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="lg"
                                            >
                                                Create Account
                                            </Button>
                                        </div>
                                        <Footer
                                            type="signup"
                                        />
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
