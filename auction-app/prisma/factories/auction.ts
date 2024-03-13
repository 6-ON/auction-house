import { Auction, AuctionObject, Category } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { db } from '../../lib/db'

export async function auctionFactory(c: number = 1) {
	const categories = await db.category.findMany()
	const users = await db.user.findMany()
	const auctions = await Promise.all(
		Array(c)
			.fill(0)
			.map(
				async () =>
					await db.auction.create({
						data: {
							title: faker.commerce.productName(),
							tags: [faker.commerce.productAdjective()],
							description: faker.commerce.productDescription(),
							initialPrice: +faker.commerce.price(),
							endDate: faker.date.future(),
							startDate: faker.date.future(),
							userId: users[Math.round(Math.random() * users.length)].id,
							categoryId: categories[Math.round(Math.random() * categories.length)].id,
							objects: {
								create: await Promise.all(
									Array(Math.round((Math.random() + 1) * 3))
										.fill(0)
										.map(async () => await objectDefaults())
								),
							},
						},
						include: { objects: true, category: true },
					})
			)
	)
	return auctions
}

async function objectDefaults(): Promise<Omit<AuctionObject, 'id' | 'auctionId'>> {
	return {
		title: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		image: faker.image.urlLoremFlickr({ category: 'museum' }),
	}
}
