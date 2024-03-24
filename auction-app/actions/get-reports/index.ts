'use server'

import { db } from '@/lib/db'
import { ReportsSearchParams } from './types'
import { Prisma } from '@prisma/client'
import { searchParamsSchema } from './schema'

const handler = async (sp?: ReportsSearchParams) => {
	const pageSize = 10
	let where: Prisma.ReportWhereInput = {}
	const validatedResult = searchParamsSchema.safeParse(sp ?? {})

	if (!validatedResult.success) throw new Error('Invalid search params')

	const { data: params } = validatedResult

	const currentPage = params.page || 1

	if (params.q)
		where.OR = [
			{ reason: { contains: params.q, mode: 'insensitive' } },
			{ reporter: { fullName: { contains: params.q, mode: 'insensitive' } } },
			{ reported: { fullName: { contains: params.q, mode: 'insensitive' } } },
		]

	const userSelect: Prisma.UserDefaultArgs = { select: { fullName: true, id: true, email: true } }

	const [totalItems, reports] = await db.$transaction([
		db.report.count({ where }),
		db.report.findMany({
			where,
			skip: (currentPage - 1) * pageSize,
			take: pageSize,
			include: { reported: userSelect, reporter: userSelect },
		}),
	])

	const totalPages = Math.ceil(totalItems / pageSize)

	return {
		reports,
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

export const getReports = handler

export type GetReportsResult = Awaited<ReturnType<typeof getReports>>
