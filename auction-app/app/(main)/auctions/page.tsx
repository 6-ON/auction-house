import Link from 'next/link'
import { Footer } from '@/components/partial'
import FiltersDrawer from './components/filters-drawer'
import { AuctionCardV2, SearchAuctionsAlt } from '@/components/common'
import { getAuctions } from '@/actions/get-auctions'
import { getCategories } from '@/actions/get-categories'
import { AuctionSearchParams } from '@/actions/get-auctions/types'
import { PaginationArea } from './components/pagination-area'

export default async function AuctionsPage({ searchParams }: { searchParams: AuctionSearchParams }) {
	const { auctions, meta } = await getAuctions(searchParams)
	const categories = await getCategories()

	return (
		<>
			<div className="max-w-7xl w-full mx-auto px-4">
				<div className="flex flex-col  gap-4">
					<header className="flex  justify-center space-y-2 py-6">
						<div className="flex items-center space-x-4">
							<nav className="flex items-center space-x-4 ml-auto">
								<FiltersDrawer categories={categories} />
								<Link className="font-medium underline" href="/auctions/new">
									Sell Item
								</Link>
							</nav>
						</div>
						<div className="w-full max-w-md ml-auto">
							<SearchAuctionsAlt defaultValue={searchParams.q} />
						</div>
					</header>
					<main className="flex-1">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{auctions.map((auction) => (
								<AuctionCardV2 key={auction.id} auction={auction} />
							))}
						</div>
						<div className="my-10">
							<PaginationArea searchParams={searchParams} meta={meta} />
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</>
	)
}
