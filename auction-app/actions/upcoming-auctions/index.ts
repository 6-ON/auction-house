import { db } from '@/lib/db'

const handler = async () => {
	const upcomingAuctions = await db.auction.findMany({
		where: {
			startDate: {
				gt: new Date(),
			},
		},
		orderBy: {
			startDate: 'asc',
		},
		take: 3,
	})
	return upcomingAuctions
}

export const getUpcomingAuctions = handler