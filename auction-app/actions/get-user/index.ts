import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function getProfile(id: string) {
	const profile = await db.user.findUnique({
		where: {
			id,
		},
		select: { email: true, fullName: true, username: true, id: true },
	})
	if (!profile) notFound()
	return profile
}
export const getUser = async (id: string) => {
	return await db.user.findUnique({
		where: {
			id,
		},
	})
}

export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>>
