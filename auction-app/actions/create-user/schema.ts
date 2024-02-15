import { z } from 'zod'

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	fullName: z.string().min(3),
	username: z.string().min(3),
})
