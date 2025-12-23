import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  token: z.string().optional(),
})

export const LoginCredentialsSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type User = z.infer<typeof UserSchema>
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>

export interface LoginResponse {
  user: User
  token: string
}

