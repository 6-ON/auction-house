import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { db } from '../../lib/db'

export async function userFactory(c: number = 1) {
	const users = await Promise.all(
		Array(c)
			.fill(0)
			.map(async () => await userDefaults())
	)
	return await db.user.createMany({ data: users })
}

async function userDefaults(): Promise<Omit<User, 'id'>> {
	return {
		email: faker.internet.email(),
		fullName: faker.person.fullName(),
		password: await hash('password'),
		username: faker.internet.userName(),
	}
}
