import { z } from 'zod'

// Zod Validation
const createUserZodValidation = z.object({
  body: z.object({
    role: z.string({ required_error: 'Role is required' }),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodValidation,
}
