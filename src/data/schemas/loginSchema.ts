import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .min(5, 'El email es requerido')
    .email('El email debe ser válido'),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña es requerida'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

