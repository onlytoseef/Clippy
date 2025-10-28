import { z } from "zod"

export const profileSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
})

export type ProfileSchema = z.infer<typeof profileSchema>
