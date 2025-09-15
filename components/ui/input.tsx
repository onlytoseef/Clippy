import * as React from "react"
import { cn } from "@/lib/utils"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const isEmail = type === "email"

    const leftIcon = isPassword ? (
      <Lock className="h-4 w-4 text-foreground/50" />
    ) : isEmail ? (
      <Mail className="h-4 w-4 text-foreground/50" />
    ) : null

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "block w-full py-3 border border-border rounded-lg bg-input text-foreground placeholder-foreground/50 transition-colors",
              type === "text" && "pl-3",
              leftIcon && "pl-10 pr-3",
              isPassword && "pr-12",
              className
            )}
            {...props}
          />

          {isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-1 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
