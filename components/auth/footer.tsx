import Link from 'next/link'
import React from 'react'

const Footer = ({ type }: { type: string }) => {
  const isLogin = type === "login"

  return (
    <div className="flex items-center justify-center gap-1 text-sm">
      <p className="text-foreground/70">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </p>
      <Link
        href={isLogin ? "/auth/signup" : "/auth/login"}
        className="font-medium text-accent hover:text-primary transition-colors"
      >
        {isLogin ? "Sign up" : "Log in"}
      </Link>
    </div>
  )
}

export default Footer
