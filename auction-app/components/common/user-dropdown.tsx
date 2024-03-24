'use client'
import { LogOut, PlusCircle, Settings, ShieldCheck, UserIcon } from 'lucide-react'
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
import { User } from 'next-auth'
import { Avatar, AvatarFallback } from '../ui/avatar'

export function AccountDropdown({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="p-1 hover:bg-muted hover:bg-opacity-10 rounded-full">
				<Avatar>
					<AvatarFallback>{user.name?.[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="me-4">
				<DropdownMenuLabel>Hello {user.name} !</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{!user.isBanned && (
					<DropdownMenuItem>
						<Link href="/auctions/new" className="w-full flex gap-2 pe-12">
							<PlusCircle className="w-5 h-5" />
							<span>Create Auction</span>
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem>
					<Link href="/settings" className="w-full flex gap-2">
						<Settings className="w-5 h-5" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				{user.isAdmin && (
					<DropdownMenuItem>
						<Link href="/admin/dashboard" className="w-full flex gap-2">
							<ShieldCheck className="w-5 h-5" />
							<span>Adminstration</span>
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={async () => await logout()} className="cursor-pointer flex gap-2">
					<LogOut className="w-5 h-5" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
