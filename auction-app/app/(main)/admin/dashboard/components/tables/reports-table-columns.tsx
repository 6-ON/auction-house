/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ReportWithReporter } from '@/types/app'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const columns: ColumnDef<ReportWithReporter>[] = [
	{
		id: 'Reported User',
		header: 'Reported User',
		cell: ({ row }) => <UserCell user={row.original.reported} />,
	},
	{
		id: 'Reporter',
		header: 'Reporter',
		cell: ({ row }) => <UserCell user={row.original.reporter} />,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		cell: ({ row }) => (
			<div className="lowercase ">
				{row.getValue('reason')}
			</div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <></>,
	},
]
// @ts-ignore
function UserCell({ user }) {
	return (
		<div className=" flex gap-2">
			<Avatar>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<div className="capitalize">{user.fullName}</div>
				<div className="text-sm text-gray-500">{user.email}</div>
			</div>
		</div>
	)
}
