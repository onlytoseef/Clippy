import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { SignUpFormData } from "@/types/auth"

interface IconInputProps {
  id: keyof SignUpFormData
  label: string
  type: string
  placeholder: string
  icon: LucideIcon
  register: UseFormRegister<SignUpFormData>
  errors: FieldErrors<SignUpFormData>
  autoComplete?: string
}

export function IconInput({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  register,
  errors,
  autoComplete,
}: IconInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-foreground/50" />
        </div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(id)}
          className="pl-10 pr-3 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-input text-foreground placeholder-foreground/50 transition-colors"
        />
        {errors[id] && (
          <p className="text-sm text-red-500">{errors[id]?.message}</p>
        )}
      </div>
    </div>
  )
}