import { z } from 'zod'

const sortDirection = z.enum(['asc', 'desc'])

export const searchParamsSchema = z.object({
	q: z.string().optional(),
	page: z.coerce.number().optional(),
})
