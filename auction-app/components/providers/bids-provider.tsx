'use client'

import { AuctionWithObjects, BidWithUser } from '@/types/app'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSocket } from './socket-provider'
import { getBids } from '@/actions/get-bids'

type IBidsContext = {
	bids: BidWithUser[]
	maxBid: number
	auctionId?: string
	auction: AuctionWithObjects | null
}

const BidsContext = createContext<IBidsContext>({
	bids: [],
	maxBid: 0,
	auction: null,
})

export const useBids = () => useContext(BidsContext)

export const BidsProvider = ({
	children,
	auction,
	auctionId,
}: React.PropsWithChildren<Pick<IBidsContext, 'auction' | 'auctionId'>>) => {
	const [bids, setBids] = useState<BidWithUser[]>([])
	const { socket } = useSocket()
	const chatkey = `bids:${auctionId}`

	useEffect(() => {
		if (auctionId) getBids(auctionId).then(setBids)
	}, [auctionId])

	useEffect(() => {
		if (!socket) return
		socket.on(chatkey, (bid) => {
			setBids((bids) => [...bids, bid])
		})
		return () => {
			socket.off(chatkey)
		}
	}, [chatkey, socket])

	const maxBid = useMemo(() => {
		if (!bids.length) return auction?.initialPrice || 0
		return Math.max(...bids.map((bid) => bid.amount))
	}, [bids, auction])

	return <BidsContext.Provider value={{ bids, maxBid, auctionId, auction }}>{children}</BidsContext.Provider>
}
