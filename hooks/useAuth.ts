"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { login, signup, verifyEmail, logout, resendCode, getCurrentUser, updateUser } from "@/services/auth"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { ProfileSchema } from "@/validations/profile"
import { AxiosError } from "axios"
import { showToast } from "@/lib/toast"

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            showToast.success("Login successful")
            
            // Store token
            localStorage.setItem("auth_token_x", data.token)
            
            // Redirect based on subscription status
            const redirectTo = data.redirectTo || "/pricing"
            router.push(redirectTo)
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            const response = err?.response?.data

            // Check if it's a network error or server is down
            if (err.code === 'ERR_NETWORK' || !err.response) {
                showToast.error("Internal server error. Please try again later.")
                return
            }

            if (response?.data?.needsVerification) {
                // Redirect to verification page with email
                router.push(`/auth/verify?email=${response.data.email}`)
                showToast.warning("Verification required. Please check your email.")
            } else {
                showToast.error(response?.message || "Login failed. Please try again.")
            }
        },
    })
};

export const useSignup = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: signup,
        onSuccess: (data: any) => {
            // Extract email from response
            const email = data?.data?.email || "";
            
            console.log("✅ Signup successful, response:", data);
            console.log("📧 Extracted email:", email);
            
            showToast.success("Signup successful. Please check your email for verification code.")
            
            if (!email) {
                console.error("❌ No email in response!");
                showToast.error("Email not found in response. Please try again.")
                return;
            }
            
            // Redirect to verification page with email
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            const response = err?.response?.data

            // Check if it's a network error or server is down
            if (err.code === 'ERR_NETWORK' || !err.response) {
                showToast.error("Internal server error. Please try again later.")
                return
            }

            showToast.error(response?.message || "Signup failed. Please try again.")
        },
    })
}

export const useVerifyEmail = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data: any) => {
            showToast.success("Email verified successfully. Welcome!")
            
            // Store token from response
            if (data?.data) {
                localStorage.setItem("auth_token_x", data.data.token || "")
            }
            
            // Redirect to dashboard
            router.push("/dashboard")
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            const response = err?.response?.data

            // Check if it's a network error or server is down
            if (err.code === 'ERR_NETWORK' || !err.response) {
                showToast.error("Internal server error. Please try again later.")
                return
            }

            showToast.error(response?.message || "Invalid verification code")
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
            showToast.success("Verification code resent to your email")
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            const response = err?.response?.data

            // Check if it's a network error or server is down
            if (err.code === 'ERR_NETWORK' || !err.response) {
                showToast.error("Internal server error. Please try again later.")
                return
            }

            showToast.error(response?.message || "Failed to resend code")
        },
    })
}

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ProfileSchema) => updateUser(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })

            toast({
                title: "Profile updated",
            })
        },

        onError: (error: AxiosError<ErrorResponse>) => {
            toast({
                title: "Update failed",
                description: error?.response?.data?.message || "Something went wrong.",
                variant: "destructive",
            })
        },
    })
}
