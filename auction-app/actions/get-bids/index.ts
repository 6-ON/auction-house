'use server'

import { db } from '@/lib/db'

const handler = async (auctionId: string) => {
	
	const bids = await db.bid.findMany({
		where: { auctionId },
		include: { user: { select: { id: true, fullName: true } } },
	})
	return bids
}

export const getBids = handler
