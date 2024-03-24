/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, BanIcon, MoreHorizontal, RotateCcw, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@prisma/client'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDisclosure } from '@/hooks/disclosure'
import { banUser } from '@/actions/ban-user'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'fullName',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="capitalize">{row.getValue('fullName')}</div>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<a className="lowercase" href={`mailto:${row.getValue('email')}`}>
				{row.getValue('email')}
			</a>
		),
	},
	{
		id: 'Username',
		header: 'Username',
		cell: ({ row }) => <div className="lowercase">@{row.original.username}</div>,
	},
	{
		id: 'Member Since',
		header: 'Member Since',
		cell: ({ row }) => <div className="lowercase">2024/01/21</div>,
	},
	{
		id: 'Account Status',
		header: 'Account Status',
		cell: ({ row }) => (
			row.original.isBanned &&<Badge variant="destructive">
					Banned
				</Badge>

		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original
			const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()
			const handleBanToggle = () => {
				banUser(user.id, !user.isBanned).then(() => onClose())

			}
			return (
				<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>Are you sure you want to proceed?</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<Button onClick={handleBanToggle}>Confirm</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className={cn(
									[
										!user.isBanned &&
											'data-[highlighted]:text-destructive-foreground data-[highlighted]:bg-destructive text-destructive ',
									],
									' cursor-pointer'
								)}
								onClick={() => onOpen()}
							>
								{user.isBanned ? (
									<RotateCcw className="mr-2 h-4 w-4" />
								) : (
									<BanIcon className="mr-2 h-4 w-4" />
								)}
								<span>{!user.isBanned ? 'Ban' : 'Unbann'} User</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</AlertDialog>
			)
		},
	},
]
