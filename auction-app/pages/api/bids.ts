import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiResponseServerIo } from '@/types'
import { auth } from '@/lib/auth'

import { createBid } from '@/actions/create-bid'
import { InputType } from '@/actions/create-bid/types'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
	if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

	try {
		const session = await auth(req, res)
		if (!session) return res.status(401).json({ error: 'Unauthorized' })
		const inputData: InputType = { ...req.body, userId: session.user.id }
		const rslt = await createBid(inputData)

		if (!rslt.success) {
			res.status(400).json({ error: rslt.error })
			return
		}
		const { data } = rslt
		const bidKey = `bids:${data.auctionId}`

		res.socket.server.io.emit(bidKey, data)
		res.status(201).json({ data })
	} catch (err) {
		res.status(500).json({ error: 'internal server error' })
	}
}
