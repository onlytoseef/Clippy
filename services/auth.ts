import api from "@/lib/axios"

// ✅ Register
export const signup = async (form: any) => {
  const { data } = await api.post("/api/v1/auth/register", form)
  return data
}

// ✅ Login
export const login = async (form: any) => {
  const { data } = await api.post("/api/v1/auth/login", form)
  return data
}

// ✅ Verify Email
export const verifyEmail = async (form: { email: string; code: string }) => {
  const { data } = await api.post("/api/v1/auth/verify", form)
  return data
}

// ✅ Logout
export const logout = async () => {
  const { data } = await api.post("/api/v1/auth/logout")
  return data
}

export const resendCode = async (email: string) => {
  const { data } = await api.post("/api/v1/auth/resend", { email })
  return data
}
