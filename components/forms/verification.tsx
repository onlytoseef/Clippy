"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Header from "../auth/header"
import Title from "../auth/Title"

// Zod schema for only code
const codeSchema = z.object({
    code: z.string().min(6, "Verification code must be at least 6 digits")
})

type CodeFormData = z.infer<typeof codeSchema>

export default function EmailVerificationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: ""
        }
    })

    const onSubmit = (data: CodeFormData) => {
        console.log("Verification code submitted:", data)
        // TODO: Call backend API for verifying code
    }

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
                    <div className="w-full md:w-3/5  p-8 flex flex-col justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <Title
                                title="Check your email"
                                subTitle="We’ve sent a 6-digit verification code to your email address. Enter it below to continue."
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
                                    variant="default"
                                    size="xl"
                                    className="w-full rounded-full"
                                >
                                    Verify
                                </Button>
                            </div>

                            {/* Resend option */}
                            <p className="text-sm text-center text-foreground/60 mt-4">
                                Didn’t receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={() => console.log("Resend code")}
                                    className="text-accent hover:text-primary font-medium"
                                >
                                    Resend
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
