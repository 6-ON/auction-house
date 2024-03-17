import { z } from 'zod'

export const reportSchema = z.object({
	reason: z.string().trim().min(3),
	reportedId: z.string(),
})
