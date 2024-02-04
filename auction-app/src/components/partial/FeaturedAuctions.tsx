import { AuctionCard } from '../common/AuctionCard'

export const FeaturedAuctions = () => (
	<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
		<div className="container px-4 md:px-6">
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Auctions</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{Array.from({ length: 3 }).map((_,i) => (
					<AuctionCard key={i} />
				))}
			</div>
		</div>
	</section>
)
