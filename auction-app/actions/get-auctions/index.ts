'use server'

import { db } from '@/lib/db'
import { AuctionSearchParams } from './types'
import { Prisma } from '@prisma/client'
import { searchParamsSchema } from './schema'
import { redirect } from 'next/navigation'

const handler = async (sp?: AuctionSearchParams) => {
	const pageSize = 9
	let where: Prisma.AuctionWhereInput = {}

	const validatedResult = searchParamsSchema.safeParse(sp)

	if (!validatedResult.success) redirect('/auctions')

	const { data: params } = validatedResult

	const currentPage = params.page || 1
	if (params) {
		if (params.q)
			where.OR = [
				{ title: { contains: params.q, mode: 'insensitive' } },
				{ description: { contains: params.q, mode: 'insensitive' } },
			]

		if (params.category) where.categoryId = params.category

		if (params.minPrice || params.maxPrice) {
			where.initialPrice = {}
			if (params.minPrice) where.initialPrice.gte = params.minPrice

			if (params.maxPrice) where.initialPrice.lte = params.maxPrice
		}
	}

	const [totalItems, auctions] = await db.$transaction([
		db.auction.count({ where }),
		db.auction.findMany({
			where,
			include: { objects: true },
			skip: (currentPage - 1) * pageSize,
			take: pageSize,
		}),
	])
	const totalPages = Math.ceil(totalItems / pageSize)
	return {
		auctions,
		meta: {
			totalItems,
			pageSize,
			totalPages,
			currentPage,
			nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
			prevPage: currentPage > 1 ? currentPage - 1 : undefined,
		},
	}
}
export const getAuctions = handler
export type GetAuctionsResult = Awaited<ReturnType<typeof getAuctions>>
