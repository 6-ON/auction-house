import { db } from '../lib/db'
import { userFactory } from './factories/user'
import { categoryFactory } from './factories/category'
import { auctionFactory } from './factories/auction'

async function seed() {
	await userFactory(10)
	await categoryFactory(10)
	await auctionFactory(50)
	// console.log(faker.image.({ category: 'museum' }))
}

seed()
