'use server'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { reportSchema } from './schema'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const hanlder = async ({ reason, reportedId }: InputType): Promise<ReturnType> => {
	const session = await auth()
	if (!session) return { success: false, error: 'unauthorized' }

	const user = await db.user.findUnique({ where: { id: reportedId } })
	if (!user) return { success: false, error: 'reported user not found' }

	await db.report.create({ data: { reportedId, reason, reporterId: session.user.id } })
	return { success: true, data: undefined }
}

export const reportUser = createSafeAction(reportSchema, hanlder)
