import { db } from '@/lib/db'
import { InputType, OutputType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'
import { bidSchema } from './schema'
import { BidWithUser } from '@/types/app'

const handler = async ({ amount, auctionId, userId }: InputType): Promise<OutputType> => {
	try {
		const auction = await db.auction.findFirst({ where: { id: auctionId } })
		if (!auction) return { error: 'auction not found' }
		if (auction.endDate < new Date()) return { error: 'Auction has ended' }
		if (auction.initialPrice > amount) return { error: 'Bid amount must be greater than the initial price' }

		const maxBid = await db.bid.findFirst({
			where: { auctionId },
			orderBy: { amount: 'desc' },
		})
		if (maxBid && maxBid.amount >= amount)
			return { error: 'Bid amount must be greater than the current highest bid' }
		const bid = (await db.bid.create({
			data: { amount, auctionId, userId },
			include: {
				user: { select: { id: true, fullName: true } },
			},
		})) as BidWithUser
		return { data: bid, success: true }
	} catch (error) {
		return { error: 'Internal server error' }
	}
}

export const createBid = createSafeAction(bidSchema, handler)
