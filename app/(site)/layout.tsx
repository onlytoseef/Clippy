import type React from "react"
import { Navbar } from "@/components/Navbar"

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
