import { db } from '@/lib/db'

export async function getProfile(id: string) {
	try {
		return await db.user.findUnique({
			where: {
				id,
			},
			select: { email: true, fullName: true, username: true },
		})
	} catch (error) {
		console.error(error)
		return null
	}
}
export const getUser = async (id: string) => {
	return await db.user.findUnique({
		where: {
			id,
		},
	})
}

export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>>
