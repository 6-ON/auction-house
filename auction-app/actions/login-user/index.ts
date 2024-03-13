'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { SignInSchema, ReturnType } from './types'
import { signInSchema } from './schema'
import { db } from '@/lib/db'
import { compare } from 'bcryptjs'
import { verify } from 'argon2'

const handler = async ({ email, password }: SignInSchema): Promise<ReturnType> => {
	const user = await db.user.findUnique({
		where: { email },
	})
	if (!user) return { error: 'Credentials wrong' }
	const { password: hashedPw, ...data } = user
	if (!(await verify(hashedPw, password))) return { error: 'Credentials wrong' }
	return { data, success: true }
}

export const loginUser = createSafeAction(signInSchema, handler)
