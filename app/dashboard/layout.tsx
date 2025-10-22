import DashboardGuard from "@/components/DashboardGuard"
import type React from "react"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <DashboardGuard>
                {children}
            </DashboardGuard>
        </>
    )
}
