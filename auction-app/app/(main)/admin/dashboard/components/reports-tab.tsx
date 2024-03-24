import { getReports } from '@/actions/get-reports'
import React from 'react'
import { ReportsTable } from './tables/reports-table'
// @ts-ignore
export const ReportsTab = async ({ sp }) => {
	const reports = await getReports(sp)
	return <ReportsTable data={reports} sp={sp} />
}
