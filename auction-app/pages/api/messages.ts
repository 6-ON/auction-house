import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiResponseServerIo } from '@/types'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { messageSchema } from '@/actions/send-message/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
	if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

	try {
		const session = await auth(req, res)
		if (!session) return res.status(401).json({ error: 'Unauthorized' })
		if (session.user.isBanned) return res.status(403).json({ error: 'Forbidden' })
		const { auctionId, content } = messageSchema.parse(req.body)

		const chatKey = `chat:${auctionId}`
		const message = await db.message.create({
			data: {
				content,
				auctionId,
				senderId: session.user.id!,
			},
			select: { sender: { select: { id: true, fullName: true } }, content: true, createdAt: true, id: true },
		})

		res.socket.server.io.emit(chatKey, message)
		res.end()
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ fieldErrors: err.errors })
		}
		res.status(500).json({ error: 'internal server error' })
	}
}
