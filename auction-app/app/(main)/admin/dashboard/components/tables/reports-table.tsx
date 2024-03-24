'use client'
import React, { use, useEffect, useState } from 'react'
import {
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './reports-table-columns'
import { useRouter } from 'next/navigation'
import { PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
// @ts-ignore
export function ReportsTable({ data, sp }) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [search, setSearch] = useState('')
	const router = useRouter()
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

	const table = useReactTable({
		data: data?.reports ?? [],
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnVisibility,
		},
	})

	useEffect(() => {
		if (search) router.replace(`/admin/dashboard?q=${search}`)
		else router.replace('/admin/dashboard')
	}, [search, router])

	useEffect(() => {
		router.replace('/admin/dashboard')
	}, [router])
	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Search for reports"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{!data ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Loading...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4 select-none">
				<div className="space-x-2">
					{data?.meta.prevPage && (
						<PaginationPrevious href={{ query: { ...sp, page: data?.meta.prevPage } }} />
					)}
					{data?.meta.prevPage && <PaginationNext href={{ query: { ...sp, page: data?.meta.nextPage } }} />}
				</div>
			</div>
		</div>
	)
}
