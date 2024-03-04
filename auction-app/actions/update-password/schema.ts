import { z } from 'zod'

export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(8),
		newPassword: z.string().min(8),
		confirmNewPassword: z.string().min(8),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, { message: 'Passwords do not match' })
