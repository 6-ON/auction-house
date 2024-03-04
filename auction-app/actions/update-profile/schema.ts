import { z } from 'zod'

export const UpdateProfileSchema = z.object({
	fullName: z.string().min(3).optional(),
	username: z.string().min(3).optional(),
})
