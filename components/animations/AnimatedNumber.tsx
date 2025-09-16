"use client"
import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedNumberProps {
    number: number
    suffix?: string
}

export default function AnimatedNumber({ number, suffix = "" }: AnimatedNumberProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)

    // Track if element is in viewport
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    useEffect(() => {
        if (!isInView) return // only start when visible

        const timer = setInterval(() => {
            setCount(prev => {
                const increment = Math.ceil(number / 50)
                if (prev + increment >= number) {
                    clearInterval(timer)
                    return number
                }
                return prev + increment
            })
        }, 50)

        return () => clearInterval(timer)
    }, [isInView, number])

    return (
        <span ref={ref}>
            {count === number && number % 1 !== 0 ? number.toFixed(1) : Math.floor(count)}
            {suffix}
        </span>
    )
}
