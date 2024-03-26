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
import { User } from 'next-auth'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function AccountDropdown({ user }: { user: User }) {
	const router = useRouter()
	const handleLogout = async () => {
		const res = await signOut({ redirect: false, callbackUrl: '/' })
		router.push(res.url)
		router.refresh()
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="p-1 hover:bg-muted hover:bg-opacity-10 rounded-full" data-cy="usr-dropdown">
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
				<DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex gap-2" data-cy="usr-logout-btn">
					<LogOut className="w-5 h-5" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
