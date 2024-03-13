'use server'

import { db } from '@/lib/db'

const handler = async (auctionId: string) => {
	const messages = await db.message.findMany({
		where: { auctionId },
		include: {
			sender: {
				select: {
					id: true,
					fullName: true,
				},
			},
		},
	})
	return messages
}

export const getMessages = handler
