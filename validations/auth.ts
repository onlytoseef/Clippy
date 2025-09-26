import { z } from "zod"

// export const signUpSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//     user_type: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   })

 export const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
    user_type: z.string(),
  })

  export const codeSchema = z.object({
    code: z.string().min(6, "Verification code must be at least 6 digits")
})

// export type SignUpFormData = z.infer<typeof signUpSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type CodeFormData = z.infer<typeof codeSchema>


export const step1Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  user_type: z.string(),
});

export const step2Schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Final signup schema (merge both)
export const signUpSchema = step1Schema.merge(step2Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;