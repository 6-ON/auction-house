import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OverviewTab from './components/overview-tab'
import { ReportsTab } from './components/reports-tab'
import { UsersTab } from './components/users-tab'
import { ScrollArea } from '@/components/ui/scroll-area'
export const metadata: Metadata = {
	title: 'Dashboard',
}
// @ts-ignore
export default async function DashboardPage({ searchParams }) {
	const session = await auth()
	if (!session?.user.isAdmin) redirect('/')

	return (
		<ScrollArea className="max-h-full">
			<div className="flex-col flex container">
				<div className="flex-1 space-y-4  pt-6">
					<div className="flex items-center md:justify-between justify-center space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					</div>
					<Tabs defaultValue="users" className="space-y-4 flex flex-col">
						<TabsList className="max-md:mx-auto w-fit ">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="users">Users</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="space-y-4">
							<OverviewTab />
						</TabsContent>
						<TabsContent value="users" className="space-y-4">
							<UsersTab sp={searchParams} />
						</TabsContent>
						<TabsContent value="reports" className="space-y-4">
							<ReportsTab sp={searchParams} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</ScrollArea>
	)
}
