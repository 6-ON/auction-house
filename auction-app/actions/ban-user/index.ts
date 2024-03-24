'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const handler = async (id: string, isBanned: boolean) => {
	await db.user.update({ where: { id }, data: { isBanned } })
	revalidatePath('/admin/dashboard')
	return isBanned
}

export const banUser = handler
