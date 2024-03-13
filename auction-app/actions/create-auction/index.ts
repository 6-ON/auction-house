'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { createAuctionSchema } from './schema'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { startDate, endDate, categoryId, description, initialPrice, objects, tags, title } = data
	const session = await auth()
	if (!session) throw new Error('no session')
    
	const userId = session.user?.id!
	const created = await db.auction.create({
		data: {
			description,
			initialPrice,
			title,
			categoryId,
			userId,
			objects: { create: [...objects] },
			endDate: new Date(endDate),
			startDate: new Date(startDate),
		},
		include: {
			objects: true,
		},
	})
	return { data: created, success: true }
}

export const createAuction = createSafeAction(createAuctionSchema, handler)
