import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const HeroSection: React.FC = () => (
	<section className="w-full bg-[url('/placeholder.svg')] py-12 md:py-24 lg:py-32 xl:py-48">
		<div className="container px-4 md:px-6">
			<div className="flex flex-col items-center space-y-4 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						Welcome to Auction House
					</h1>
					<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
						Find the best deals and rare items in our online auctions.
					</p>
				</div>
				<div className="w-full max-w-sm space-y-2">
					<form className="flex space-x-2">
						<Input placeholder="Search for auctions ..." />
						<Button>Search</Button>
					</form>
				</div>
			</div>
		</div>
	</section>
)
