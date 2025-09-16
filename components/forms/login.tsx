"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData, loginSchema } from "@/validations/auth"
import { signIn } from "@/auth"
import Footer from "../auth/footer"
import { Input } from "../ui/input"
import Header from "../auth/header"
import Title from "../auth/Title"
import { Button } from "../ui/button"

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    })

    const onSubmit = (data: LoginFormData) => {
        console.log("Form submitted:", data)
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
                    {/* Left side */}
                    <Header
                        title="Login"
                        subTitle="Access your account to continue"
                    />

                    {/* Right side form */}
                    <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <Title
                                title="Welcome back"
                                subTitle="Sign in to your account"
                            />
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                {...register("email")}
                                error={errors.email?.message}
                            />

                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                {...register("password")}
                                error={errors.password?.message}
                            />


                            {/* Remember me */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        type="checkbox"
                                        {...register("rememberMe")}
                                        className="h-4 w-4 text-accent focus:ring-accent border-border rounded"
                                    />
                                    <label
                                        htmlFor="rememberMe"
                                        className="ml-2 pb-1 block text-sm text-foreground/80"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm text-accent hover:text-primary transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <Button
                                    variant="default"
                                    size="xl"
                                    className="w-full rounded-full"
                                >
                                    Sign in
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="my-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-3 bg-card text-foreground/60">
                                            or continue with
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Google */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => signIn("google")} // <-- Added NextAuth Google SignIn
                                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-border rounded-lg shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>

                            {/* Sign Up */}
                            <Footer
                                type="login"
                            />
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
