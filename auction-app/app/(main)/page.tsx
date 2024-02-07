import { FeaturedAuctions, Footer, HeroSection, UpcomingAuctions } from '../../components/partial'

export default function Home() {
	return (
		<main className="flex-1">
			<HeroSection />
			<FeaturedAuctions />
			<UpcomingAuctions />
			<Footer />
		</main>
	)
}
