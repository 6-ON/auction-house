import { z } from 'zod'

export const createObjectSchema = z.object({
	title: z.string().min(3).max(30),
	description: z.string().min(2).max(40),
	image: z.string().url(),
})

export const createAuctionSchema = z.object({
	title: z.string().min(5).max(40),
	description: z.string().min(5).max(40),
	initialPrice: z.coerce.number().min(0.1),
	startDate: z.number().min(Date.now(), { message: 'Start date must be in the future' }),
	endDate: z.number().min(Date.now(), { message: 'End date must be in the future' }),
	tags: z.array(z.string().min(2).max(10)),
	categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/),
	objects: z.array(createObjectSchema).min(1, { message: 'the Auction should has Atleast 1 Object' }),
})

export const stepOneSchema = createAuctionSchema
	.omit({ objects: true })
	.refine((data) => data.startDate < data.endDate, {
		message: 'End date must be after start date',
		path: ['endDate'],
	})
export const stepTwoSchema = createAuctionSchema.pick({ objects: true })
