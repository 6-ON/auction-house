import { AuctionWithObjects } from '@/types/app'
import { AuctionCardV2 } from '../common/auction-card'

export const FeaturedAuctions: React.FC<{
	auctions: AuctionWithObjects[]
}> = ({ auctions }) => (
	<section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-gray-800">
		<div className="container px-4 md:px-6">
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Auctions</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{auctions.map((auction) => (
					<AuctionCardV2 key={auction.id} auction={auction} />
				))}
			</div>
		</div>
	</section>
)
