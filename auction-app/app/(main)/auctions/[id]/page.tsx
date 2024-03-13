import { AuctionObjectsCarousel } from './components/auction-objects-carousel'
import PlaceBidButton from './components/place-bid'
import { getAuction } from '@/actions/get-auction'
import { formatDistanceToNow } from 'date-fns'
import ChatSection from './components/chat/chat-section'
import { SocketProvider } from '@/components/providers/socket-provider'
import { BidsHistory } from './components/bids-history'
import { BidsProvider } from '@/components/providers/bids-provider'

async function AuctionPage({ params }: { params: { id: string } }) {
	const auction = await getAuction(params.id)
	const { title, description, objects, startDate, endDate } = auction
	return (
		<SocketProvider>
			<div className="grid md:grid-cols-2 items-start max-w-7xl px-4 mx-auto gap-6 lg:gap-12 my-20">
				<BidsProvider auctionId={params.id} auction={auction}>
					<div className="grid gap-4 items-start max-md:text-center">
						<div className="flex items-start gap-4 max-md:flex-col max-md:items-center">
							<div className="grid gap-2">
								<h1 className="font-bold text-3xl lg:text-4xl">{title}</h1>
								<p className="text-sm leading-normal text-gray-500">
									Bidding ends {formatDistanceToNow(endDate)}
								</p>
							</div>
							<PlaceBidButton />
						</div>
						<div className="grid gap-4">
							<AuctionObjectsCarousel objects={objects} />
							<div className="grid gap-2 bg-slate-100 p-4 rounded-lg shadow-sm">
								<h3 className="font-semibold text-xl">Description</h3>
								<p className="text-sm leading-normal ms-3">{description}</p>
							</div>
						</div>
					</div>
					<div className="grid gap-4 items-start max-md:text-center ">
						<BidsHistory />
					</div>
				</BidsProvider>
				<ChatSection auctionId={params.id} />
			</div>
		</SocketProvider>
	)
}

export default AuctionPage
