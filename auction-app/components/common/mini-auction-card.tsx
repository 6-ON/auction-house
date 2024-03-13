import { Auction } from '@prisma/client'
import { formatDistanceToNow, formatRelative } from 'date-fns'
import Link from 'next/link'

export const MiniAuctionCard: React.FC<{
	auction: Auction
}> = ({ auction }) => (
	<Link href={`/auctions/${auction.id}`} className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md">
		<div className="p-6">
			<h3 className="text-2xl font-semibold leading-none tracking-tight">{auction.title}</h3>
			<p className="text-gray-500 dark:text-gray-400">Starts in: {formatRelative(auction.startDate,Date.now())}</p>
		</div>
	</Link>
)
