import { z } from 'zod'

export const bidSchema = z.object({
	auctionId: z.string(),
	amount: z.number(),
	userId: z.string(),
})
