"use client"

import type React from "react"
import QueryProvider from "./queryProvider"
import { Toaster } from "@/components/ui/toast"
import AuthGuard from "@/components/AuthGuard"

export function Provider({ children }: { children: React.ReactNode }
) {
    return (
        <QueryProvider>
            <AuthGuard>
                {children}
            </AuthGuard>
            <Toaster />
        </QueryProvider>
    )
}