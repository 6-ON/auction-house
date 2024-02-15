'use client'
import { LogOut, User } from 'lucide-react'
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
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href="/profile" className="w-full">
						<span>Profile</span>
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
