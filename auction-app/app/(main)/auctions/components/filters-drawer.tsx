'use client'

import { Button } from '@/components/ui/button'
import {
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
	Drawer,
} from '@/components/ui/drawer'
import React from 'react'
import { FilterIcon } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Category } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/router'
type Props = {
	categories: Category[]
}

const FiltersDrawer: React.FC<Props> = ({ categories }) => {
	const [open, setOpen] = React.useState(false)

	const pathname = usePathname()
	const sp = useSearchParams()
	const { push } = useRouter()
	const onCategoryChange = (value: string) => {
		const newSp = new URLSearchParams(sp!)

		if (value === 'all') newSp.delete('category')
		else newSp.set('category', value)

		const newUrl = `${pathname}?${newSp}`
		push(newUrl)
	}
	const [minPrice, setMinPrice] = React.useState('')
	const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinPrice(e.target.value)
		const newSp = new URLSearchParams(sp!)
		if (e.target.value) newSp.set('minPrice', e.target.value)
		else newSp.delete('minPrice')
		const newUrl = `${pathname}?${newSp}`
		push(newUrl)
	}
	const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSp = new URLSearchParams(sp!)
		if (e.target.value) newSp.set('maxPrice', e.target.value)
		else newSp.delete('maxPrice')
		const newUrl = `${pathname}?${newSp}`
		push(newUrl)
	}
	return (
		<Drawer open={open} onOpenChange={setOpen} >
			<DrawerTrigger asChild>
				<Button variant="outline" className="flex gap-2">
					<FilterIcon size={24} />
					Filter
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Filters</DrawerTitle>
					<DrawerDescription>Filter the auctions based on the criteria below</DrawerDescription>
				</DrawerHeader>
				<div className="p-16">
					<div className="flex flex-col gap-4">
						<div className="space-y-1">
							<Label htmlFor="category" className="text-sm font-semibold">
								Category
							</Label>
							<Select onValueChange={onCategoryChange}>
								<SelectTrigger className="">
									<SelectValue placeholder="Select a Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									{categories.map((cat) => (
										<SelectItem value={cat.id} key={cat.id}>
											{cat.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-1">
							<label className="text-sm font-semibold">Price Range</label>
							<div className="flex gap-2">
								<Input
									type="number"
									className="w-1/2 p-2 border rounded-md"
									placeholder="Min"
									onChange={onMinPriceChange}
									min={0}
								/>
								<Input
									type="number"
									className="w-1/2 p-2 border rounded-md"
									placeholder="Max"
									min={minPrice || 0}
									onChange={onMaxPriceChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default FiltersDrawer
