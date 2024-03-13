import { getFeaturedAuctions } from '@/actions/featured-auctions'
import { FeaturedAuctions, Footer, HeroSection, UpcomingAuctions } from '../../components/partial'
import { getUpcomingAuctions } from '@/actions/upcoming-auctions'

export default async function Home() {
	const  featuredAuctions = await getFeaturedAuctions()
	const upcomingAuctions = await getUpcomingAuctions()
	return (
		<main className="flex-1">
			<HeroSection />
			<FeaturedAuctions auctions={featuredAuctions} />
			<UpcomingAuctions auctions={upcomingAuctions}/>
			<Footer />
		</main>
	)
}
