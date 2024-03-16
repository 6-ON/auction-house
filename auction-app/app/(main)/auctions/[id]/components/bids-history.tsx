'use client'
import { getBids } from '@/actions/get-bids'
import { useBids } from '@/components/providers/bids-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BidWithUser } from '@/types/app'
import { HandCoins } from 'lucide-react'
import Link from 'next/link'

export const BidsHistory = () => {
	const { bids } = useBids()
	return (
		<div className="grid gap-2 border p-4 rounded-lg shadow-sm">
			<h3 className="font-semibold text-xl">Bid History</h3>
			{!bids.length ? (
				<p className="text-sm leading-normal ms-3">No bids have been placed yet.</p>
			) : (
				<ScrollArea className="border h-72 rounded-lg py-4 scroll-smooth bg-slate-100">
					<div className="flex flex-col-reverse items-start gap-4 ms-4">
						{bids.map((bid) => (
							<BidItem bid={bid} key={bid.id} />
						))}
					</div>
				</ScrollArea>
			)}
		</div>
	)
}
function BidItem({ bid }: { bid: BidWithUser }) {
	const { user, amount, createdAt } = bid
	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-2">
				<HandCoins className="h-6 w-6 opacity-70 text-green-800" />
				<p className="text-slate-600 text-sm">
					<Link href={`/u/${user.id}`} className="hover:underline me-1">
						{user.fullName}
					</Link>
					placed a Bid :
				</p>
			</div>
			<h4 className="font-semibold text-base">{amount.toFixed(2)}$</h4>
		</div>
	)
}
