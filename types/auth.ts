export interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface UpdateUserPayload {
  name ?: string
  phone ?: string
  address ?: string
}