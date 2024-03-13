import { Auction } from '@prisma/client'
import { MiniAuctionCard } from '../common'

export const UpcomingAuctions: React.FC<{
	auctions: Auction[]
}> = ({ auctions }) => (
	<section className="w-full py-12 md:py-24 lg:py-32">
		<div className="container px-4 md:px-6">
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Auctions</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{auctions.map((auction) => (
					<MiniAuctionCard key={auction.id} auction={auction} />
				))}
			</div>
		</div>
	</section>
)
