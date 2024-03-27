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

async function userDefaults(): Promise<Omit<User, 'id' | 'isBanned'>> {
	return {
		email: faker.internet.email(),
		fullName: faker.person.fullName(),
		password: "$argon2id$v=19$m=65536,t=3,p=4$qf3qadbZMyC42M3SK49d/A$8iuj9xEpxG2WvlUrYuROPhjL3vMEUClVjFUAxQp7NLg",
		username: faker.internet.userName(),
		isAdmin: faker.datatype.boolean(),
	}
}
export async function getRandomUser() {
	db.user.fields.fullName
	return (await db.user.aggregateRaw({
		pipeline: [{ $sample: { size: 1 } }],options:{toJSON:{explain:false}}
	}))?.[0] as any | undefined
}
