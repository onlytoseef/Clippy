import api from "@/lib/axios"
import { UpdateUserPayload } from "@/types/auth"

export const signup = async (form: any) => {
  const { data } = await api.post("/auth/register", form)
  return data
}

export const login = async (form: any) => {
  const { data } = await api.post("/auth/login", form)
  return data.data
}

export const verifyEmail = async (form: { email: string; code: string }) => {
  const { data } = await api.post("/auth/verify", form)
  return data
}

export const logout = async () => {
  const { data } = await api.post("/auth/logout")
  return data
}

export const resendCode = async (email: string) => {
  const { data } = await api.post("/auth/resend", { email })
  return data
}

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/get-current-user")
  return data.data
}

export const updateUser = async (form: UpdateUserPayload) => {
  const { data } = await api.put("/auth/update-user", form)
  return data.data
}

