'use server'
import { db } from '@/lib/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { hash } from 'argon2'
import { signUpSchema } from './schema'
import type { SignUpSchema, ReturnType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'

const handler = async (userData: SignUpSchema): Promise<ReturnType> => {
	try {
		userData.password = await hash(userData.password)
		const { password, ...user } = await db.user.create({ data: userData })
		return { data: user, success: true }
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
			return { fieldErrors: { email: ['Email already exists'] } }
		return { error: 'unknown error at create user action' }
	}
}

export const createUser = createSafeAction(signUpSchema, handler)
