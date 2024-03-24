'use server'

import { db } from '@/lib/db'
import { UsersSearchParams } from './types'
import { Prisma } from '@prisma/client'
import { searchParamsSchema } from './schema'

const handler = async (sp?: UsersSearchParams) => {
	const pageSize = 10
	let where: Prisma.UserWhereInput = {}
	let orderBy: Prisma.UserOrderByWithRelationInput = { id: 'asc' }
	const validatedResult = searchParamsSchema.safeParse(sp ?? {})

	if (!validatedResult.success) throw new Error('Invalid search params')

	const { data: params } = validatedResult

	const currentPage = params.page || 1

	if (params.q)
		where.OR = [
			{ email: { contains: params.q, mode: 'insensitive' } },
			{ fullName: { contains: params.q, mode: 'insensitive' } },
		]

	if (params.orderBy) orderBy = params.orderBy

	const [totalItems, users] = await db.$transaction([
		db.user.count({ where }),
		db.user.findMany({
			where,
			skip: (currentPage - 1) * pageSize,
			take: pageSize,
			orderBy,
		}),
	])

	const totalPages = Math.ceil(totalItems / pageSize)

	return {
		users,
		meta: {
			totalItems,
			pageSize,
			totalPages,
			currentPage,
			nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
			prevPage: currentPage > 1 ? currentPage - 1 : undefined,
		},
	}
}

export const getUsers = handler

export type GetUsersResult = Awaited<ReturnType<typeof getUsers>>
