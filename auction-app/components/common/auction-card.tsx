import Image from 'next/image'
import { icons } from 'lucide-react'
import Link from 'next/link'
import { Auction, AuctionObject } from '@prisma/client'
import { formatDistanceToNow, formatRelative, isAfter, isBefore } from 'date-fns'
import { Badge } from '../ui/badge'

type Props = {
	auction: Auction & { objects: AuctionObject[] }
}
type AuctionStatus = 'live' | 'ended' | 'upcoming'

const getStatus = ({ endDate, startDate }: Pick<Auction, 'startDate' | 'endDate'>): AuctionStatus => {
	const now = Date.now()
	if (isBefore(now, startDate)) return 'upcoming'
	if (isAfter(now, endDate)) return 'ended'
	return 'live'
}
type BadgeVariants = {
	[key in AuctionStatus]: 'success' | 'destructive' | 'secondary'
}
const badgeVariants: BadgeVariants = {
	live: 'destructive',
	ended: 'secondary',
	upcoming: 'success',
}

export const AuctionCardV2 = ({ auction }: Props) => {
	const { objects, description, id, title, initialPrice, endDate, startDate } = auction
	const status = getStatus({ endDate, startDate })
	return (
		<Link href={`/auctions/${id}`} className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-lg transition-shadow">
			<div className="border-b p-4 grid items-start gap-4">
				<div className="flex justify-between">
					<h2 className="text-lg truncate max-w-[15rem] font-bold">{auction.title}</h2>
					<Badge variant={badgeVariants[status]}>{status}</Badge>
				</div>
				<div className="text-xs text-slate-600 flex items-center space-x-2">
					<icons.Clock className="w-5 h-5 fill-current-foreground-variant" />
					<time className="font-semibold " dateTime="2023-03-16T19:00:00Z">
						{formatRelative(auction.endDate, Date.now())}
					</time>
				</div>
			</div>
			<Image
				alt={title}
				height={250}
				src={objects[0].image}
				className="w-full object-cover aspect-video"
				width={400}
			/>
			<div className="p-4 grid items-start gap-4">
				<h3 className="font-semibold text-lg">Current Bid: ${initialPrice}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
			</div>
		</Link>
	)
}
