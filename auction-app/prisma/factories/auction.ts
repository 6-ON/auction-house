import { Auction, AuctionObject } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { db } from '../../lib/db'
import { getRandomUser } from './user'
import { getRandomCategory } from './category'
import { array } from 'zod'

export async function auctionFactory(c: number = 1) {

	const auctions = await Promise.all(
		Array(c)
			.fill(0)
			.map(
				async () =>
					await db.auction.create({
						data: {
							title: faker.commerce.productName(),
							tags: Array(Math.round((Math.random() + 1) * 3)).fill(0).map(() => faker.commerce.productMaterial()),
							description: faker.commerce.productDescription(),
							initialPrice: +faker.commerce.price(),
							endDate: faker.date.future(),
							startDate: faker.date.future(),
							userId : (await getRandomUser())!._id.$oid ,
							categoryId: (await getRandomCategory())!._id.$oid,
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
