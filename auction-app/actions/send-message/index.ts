// 'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { messageSchema } from './schema'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
// this is an unsafe action cant used at the moment
const handler = async ({ auctionId, content }: InputType): Promise<ReturnType> => {
	const session = await auth()
	
	if (!session) throw new Error('Unauthorized')

	const message = await db.message.create({
		data: {
			content,
			auctionId,
			senderId: session.user.id,
		},
		select: { sender: { select: { id: true, fullName: true } }, content: true, createdAt: true, id: true },
	})

	return { success: true, data: message }
}

export const sendMesssage = createSafeAction(messageSchema, handler)
