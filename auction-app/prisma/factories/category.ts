import { Category } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { db } from '../../lib/db'

export async function categoryFactory(c: number = 1) {
	const categories = await Promise.all(
		Array(c)
			.fill(0)
			.map(async () => await categoryDefaults())
	)
	return await db.category.createMany({ data: categories })
}

async function categoryDefaults(): Promise<Omit<Category, 'id'>> {
	return {
		name: faker.commerce.department(),
	}
}
