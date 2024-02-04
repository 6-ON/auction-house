import Image from "next/image"

export const AuctionCard = () => {
	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
			<Image
				src="/placeholder.svg"
				alt="Auction Image"
				className="w-full h-48 object-cover"
				width="200"
				height="200"
			/>
			<div className="p-6">
				<h3 className="text-2xl font-semibold leading-none tracking-tight">ClassNaclassNameic Car Model</h3>
				<p className="text-gray-500 dark:text-gray-400">Current Bid: $800</p>
			</div>
		</div>
	)
}
