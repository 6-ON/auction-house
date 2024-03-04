import { db } from '../lib/db'

async function seed() {
	await db.category.createMany({ data: [{ name: 'BLABLABLA' }] })
}

seed()