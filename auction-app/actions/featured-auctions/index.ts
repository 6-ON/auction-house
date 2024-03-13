import { db } from '@/lib/db'

const handler = async () => {
	const featuredAuctions = await db.auction.findMany({
		take: 3,
		include: {
			objects: true,
		},
	})
	return featuredAuctions
}
export const getFeaturedAuctions = handler
