import { AuctionObjectsCarousel } from './components/auction-objects-carousel'
import PlaceBidButton from './components/place-bid'
import { getAuction } from '@/actions/get-auction'
import { formatDistanceToNow, isAfter, isBefore } from 'date-fns'
import ChatSection from './components/chat/chat-section'
import { SocketProvider } from '@/components/providers/socket-provider'
import { BidsHistory } from './components/bids-history'
import { BidsProvider } from '@/components/providers/bids-provider'
import { Button } from '@/components/ui/button'
import { HandshakeIcon, History, Hourglass, MessageCircleMoreIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChatProvider } from '@/components/providers/chat-provider'
import { auth } from '@/lib/auth'

async function AuctionPage({ params }: { params: { id: string } }) {
	const auction = await getAuction(params.id)
	const { title, description, objects, startDate, endDate } = auction
	const currentSession = await auth()
	return (
		<SocketProvider>
			<div className="grid md:grid-cols-2 items-start max-w-7xl px-4 mx-auto gap-6 lg:gap-12 my-10">
				<BidsProvider auctionId={params.id} auction={auction}>
					<div className="grid gap-4 items-start max-md:text-center">
						<div className="flex items-start gap-4 max-md:flex-col max-md:items-center md:justify-between">
							<div className="grid gap-2">
								<h1 className="font-bold text-3xl text-balance">{title}</h1>
								<p className="text-sm leading-normal text-gray-500">
									Bidding ends {formatDistanceToNow(endDate)}
								</p>
							</div>
							{currentSession?.user.isBanned ? (
								<></>
							) : isBefore(Date.now(), endDate) ? (
								isAfter(Date.now(), startDate) ? (
									<PlaceBidButton />
								) : (
									<Button disabled className="gap-2">
										<Hourglass className="w-6 h-6 animate-pulse" />
										Comming soon ...
									</Button>
								)
							) : (
								<Button disabled className="gap-2">
									<History className="w-6 h-6" />
									Ended
								</Button>
							)}
						</div>
						<div className="grid gap-4">
							<div className="grid gap-2 bg-secondary p-4 rounded-lg shadow-sm">
								<h3 className="font-semibold text-xl">Description</h3>
								<p className="text-sm leading-normal text-muted-foreground">{description}</p>
							</div>
							<AuctionObjectsCarousel objects={objects} />
						</div>
					</div>
					<ChatProvider auctionId={params.id}>
						<div className="grid gap-4 items-start max-md:text-center ">
							<Tabs defaultValue="bids" className="w-full">
								<TabsList className="grid w-full grid-cols-2 h-fit">
									<TabsTrigger value="bids" className="gap-2 ">
										<HandshakeIcon className="w-6 h-6" />
										Bids
									</TabsTrigger>
									<TabsTrigger value="messages" className="gap-2">
										<MessageCircleMoreIcon className="w-6 h-6" />
										Chat
									</TabsTrigger>
								</TabsList>
								<TabsContent value="bids">
									<BidsHistory />
								</TabsContent>
								<TabsContent value="messages">
									<ChatSection userBanned={currentSession?.user.isBanned!} />
								</TabsContent>
							</Tabs>
						</div>
					</ChatProvider>
				</BidsProvider>
			</div>
		</SocketProvider>
	)
}

export default AuctionPage
