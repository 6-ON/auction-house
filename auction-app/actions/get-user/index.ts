import { db } from '@/lib/db'

export async function getProfile(email: string) {
	try {
		return await db.user.findUnique({
			where: {
				email,
			},
			select: { email: true, fullName: true, username: true },
		})
	} catch (error) {
		console.error(error)
		return null
	}
}
export const getUser = async (email: string) => {
	return await db.user.findUnique({
		where: {
			email,
		},
	})
}

export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>>
