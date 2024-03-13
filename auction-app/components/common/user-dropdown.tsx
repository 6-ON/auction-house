'use client'
import { LogOut, PlusCircle, Settings, User } from 'lucide-react'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { logout } from '@/actions/logout'

export function AccountDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="p-1 hover:bg-gray-100">
				<User className="w-7 h-7" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="me-4">
				<DropdownMenuLabel>Hello User !</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem >
					<Link href="/auctions/new" className="w-full flex gap-2 pe-12">
						<PlusCircle className="w-5 h-5" />
						<span>Create Auction</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href="/settings" className="w-full flex gap-2">
						<Settings className="w-5 h-5" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () => await logout()}
					className="hover:bg-red-500 hover:text-white gap-2 hover:cursor-pointer"
				>
					<LogOut className="w-5 h-5" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
