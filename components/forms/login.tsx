"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData, loginSchema } from "@/validations/auth"
import { signIn } from "@/auth"
import Footer from "../auth/footer"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { useLogin } from "@/hooks/useAuth"
import Image from "next/image"

export default function LoginForm() {
    const { mutate, isPending } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
            user_type: "user",
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        mutate(data);
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
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md mx-auto space-y-6"
                >
                    {/* Logo and Title */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <Image src="/logo.webp" alt="Logo" width={100} height={100} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                            <p className="text-sm text-foreground/60 mt-1">Sign in to continue to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-3.5">
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

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    {...register("rememberMe")}
                                    className="h-4 w-4 text-accent focus:ring-accent border-border rounded"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="ml-2 block text-foreground/80"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                href="/auth/forgot-password"
                                className="text-accent hover:text-primary transition-colors font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="default"
                            size="xl"
                            className="w-full rounded-full"
                            disabled={isPending}
                        >
                            {isPending ? "Signing in..." : "Sign in"}
                        </Button>

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-gradient-hero text-foreground/60">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            disabled={isPending}
                            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-border rounded-full shadow-sm bg-card text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

                        {/* Sign Up Link */}
                        <Footer type="login" />
                    </div>
                </form>
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
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Professional workspace"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16">
                    <div className="text-white space-y-3">
                        <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                            Start your journey with us
                        </h2>
                        <p className="text-lg xl:text-xl text-white/90 max-w-md">
                            Join thousands of professionals who trust our platform for their daily workflow
                        </p>
                        
                        {/* Stats or features */}
                        <div className="flex gap-6 xl:gap-8 mt-6">
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">50K+</div>
                                <div className="text-sm text-white/80">Active Users</div>
                            </div>
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">4.9/5</div>
                                <div className="text-sm text-white/80">User Rating</div>
                            </div>
                            <div>
                                <div className="text-2xl xl:text-3xl font-bold">99%</div>
                                <div className="text-sm text-white/80">Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}