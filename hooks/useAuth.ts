"use client"

import { useMutation } from "@tanstack/react-query"
import { login, signup, verifyEmail, logout, resendCode } from "@/services/auth"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast({
                title: "Login Successful",
            })
            router.push("/")
        },
        onError: (err: any) => {
            const response = err?.response?.data

            if (response?.data?.needsVerification) {
                // Redirect to verification page with email
                router.push(`/auth/verify?email=${response.data.email}`)
                toast({
                    title: "Verification Required",
                    description: "We sent you a code. Please verify your email.",
                })
            } else {
                toast({
                    title: "Login Failed",
                    description: `${response?.message || "Something went wrong"}`,
                    variant: "destructive",
                })
            }
        },
    })
};

export const useSignup = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast({
                title: "Signup Successful",
            })
            router.push("/auth/login")
        },
        onError: (err: any) => {
            toast({
                title: "Signup Failed",
                description: `${err?.response?.data?.message || "Something went wrong"}`,
                variant: "destructive",
            })
        },
    })
}

export const useVerifyEmail = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => {
            toast({
                title: "Verification Successful",
                description: "Your email has been verified. Please log in.",
            })
            router.push("/")
        },
        onError: (err: any) => {
            toast({
                title: "Verification Failed",
                description: `${err?.response?.data?.message || "Invalid code"}`,
                variant: "destructive",
            })
        },
    })
}

export const useLogout = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast({
                title: "Logged Out",
                description: "You’ve been successfully logged out.",
            })
            router.push("/auth/login")
        },
        onError: () => {
            toast({
                title: "Logout Failed",
                description: "Something went wrong while logging out.",
                variant: "destructive",
            })
        },
    })
}

export const useResendCode = () => {
    return useMutation({
        mutationFn: resendCode,
        onSuccess: () => {
            toast({
                title: "Code Resent",
                description: "A new code has been sent to your email.",
            })
        },
        onError: (error: any) => {
            toast({
                title: "Code Resent Failed",
                description: `${error?.response?.data?.message || "Something went wrong while resending the code."}`,
                variant: "destructive",
            })
        },
    })
}