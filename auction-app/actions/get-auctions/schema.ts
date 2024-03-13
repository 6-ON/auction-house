import { z } from 'zod'

export const searchParamsSchema = z.object({
	q: z.string().optional(),
	page: z.coerce.number().optional(),
    category: z.string().optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional(),
})
