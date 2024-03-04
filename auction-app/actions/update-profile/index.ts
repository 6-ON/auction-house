'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { UpdateProfileSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const handler = async (data: InputType): Promise<ReturnType> => {
	try {
		const session = await auth()
		if (!session) throw new Error('no session')
		await db.user.update({
			where: { email: session.user!.email! },
			data: {
				...data,
			},
		})
		revalidatePath('/settings')
		return { success: true }
	} catch (e) {
		return { error: 'error updating profile' }
	}
}

export const updateProfile = createSafeAction(UpdateProfileSchema, handler)
