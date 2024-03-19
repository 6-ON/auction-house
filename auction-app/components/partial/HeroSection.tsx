import Image from 'next/image'
import { SearchAuctions } from '../common/search-auctions'

export const HeroSection: React.FC = () => (
	<section className="relative flex flex-col justify-center w-full  h-[101vh] -translate-y-[4.3rem]">
		<Image
			src="/bronze-figures-hero.jpg"
			className="absolute h-full w-full object-cover "
			alt="image"
			width={920}
			height={720}
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent " />
		<div className="container px-4 md:px-6 relative z-10">
			<div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl/none">
						Welcome to Auction House
					</h1>
					<p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
						Find the best deals and rare items in our online auctions.
					</p>
				</div>
				<div className="w-full max-w-sm space-y-2">
					<SearchAuctions />
				</div>
			</div>
		</div>
	</section>
)
