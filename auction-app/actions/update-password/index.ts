'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { updatePasswordSchema } from './schema'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { hash, verify } from 'argon2'
import { getUser } from '../get-user'

const handler = async (data: InputType): Promise<ReturnType> => {
	try {
		const session = await auth()
		if (!session) throw new Error('no session')

		const user = (await getUser(session.user!.id!))!
		if (!(await verify(user!.password, data.currentPassword)))
			return { fieldErrors: { currentPassword: ['Incorrect password'] } }
		const hashedPw = await hash(data.newPassword)
		await db.user.update({
			where: { id: user.id },
			data: { password: hashedPw },
		})
		return { success: true, data: undefined }
	} catch (e) {
		return { error: 'error updating password' }
	}
}

export const updatePassword = createSafeAction(updatePasswordSchema, handler)
