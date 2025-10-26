"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormData, signUpSchema } from "@/validations/auth"
import { Input } from "../ui/input"
import Footer from "../auth/footer"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { useSignup } from "@/hooks/useAuth"
import Image from "next/image"

export default function SignUpForm() {
    const [step, setStep] = useState(0);

    const { mutate: signUp, isPending } = useSignup();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            user_type: "user",
        },
        mode: "onSubmit",
    });

    const onSubmit = (data: SignUpFormData) => {
        signUp(data);
    };

    // validate only fields of current step
    const nextStep = async () => {
        let stepFields: (keyof SignUpFormData)[] = [];
        if (step === 1) stepFields = ["firstName", "lastName", "email"];
        if (step === 2) stepFields = ["password", "confirmPassword"];

        const isValid = await trigger(stepFields);
        if (isValid) setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="h-screen w-full flex overflow-hidden bg-gradient-hero">
            {/* Left side - Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 xl:px-16 overflow-y-auto"
            >
                <div className="w-full max-w-md mx-auto space-y-6 py-8">
                    {/* Logo and Title */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <Image src="/logo.webp" alt="Logo" width={100} height={100} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                            <p className="text-sm text-foreground/60 mt-1">Join us to get started</p>
                        </div>
                    </div>

                    {/* Form Steps */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            {/* Step 0 - Choose Signup */}
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    
                                    <div className="space-y-4">
                                        <Button
                                            onClick={() => setStep(1)}
                                            variant="outline"
                                            size="xl"
                                            className="w-full rounded-full border-border hover:bg-muted transition-colors"
                                        >
                                            Sign up with Email
                                            <ArrowRight className="h-5 w-5 text-foreground/50 ml-2" />
                                        </Button>
                                        
                                        <Button
                                            variant="outline"
                                            size="xl"
                                            className="w-full rounded-full border-border hover:bg-muted transition-colors"
                                        >
                                            <FcGoogle className="w-5 h-5 mr-2" />
                                            Sign up with Google
                                        </Button>
                                    </div>
                                    
                                    <Footer type="signup" />
                                </motion.div>
                            )}

                            {/* Step 1 - Personal Info */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                type="text"
                                                label="First Name"
                                                placeholder="First Name"
                                                {...register("firstName")}
                                                error={errors.firstName?.message}
                                            />
                                            <Input
                                                type="text"
                                                label="Last Name"
                                                placeholder="Last Name"
                                                {...register("lastName")}
                                                error={errors.lastName?.message}
                                            />
                                        </div>
                                        <Input
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
                                            size="lg"
                                            className="rounded-full"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            variant="default"
                                            size="lg"
                                            className="rounded-full"
                                        >
                                            Next
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                    
                                    <Footer type="signup" />
                                </motion.div>
                            )}

                            {/* Step 2 - Password */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <Input
                                            type="password"
                                            label="Password"
                                            placeholder="Enter your password"
                                            {...register("password")}
                                            error={errors.password?.message}
                                        />
                                        <Input
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
                                            size="lg"
                                            className="rounded-full"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="default"
                                            size="lg"
                                            className="rounded-full"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Creating Account..." : "Create Account"}
                                        </Button>
                                    </div>
                                    
                                    <Footer type="signup" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>

            {/* Right side - Professional Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block lg:w-1/2 relative overflow-hidden"
            >
                {/* High-quality professional image */}
                <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Team collaboration"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16">
                    <div className="text-white space-y-3">
                        <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                            Join our community
                        </h2>
                        <p className="text-lg xl:text-xl text-white/90 max-w-md">
                            Become part of our growing network of professionals and unlock new opportunities
                        </p>
                        
                        {/* Stats or features */}
                        <div className="flex gap-6 xl:gap-8 mt-6">
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">50K+</div>
                                <div className="text-sm text-white/80">Active Members</div>
                            </div>
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">24/7</div>
                                <div className="text-sm text-white/80">Support</div>
                            </div>
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">99.9%</div>
                                <div className="text-sm text-white/80">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}