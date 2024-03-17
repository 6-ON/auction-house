import { getProfile } from '@/actions/get-user'
import { MiniAuctionCard } from '@/components/common'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { auth } from '@/lib/auth'
import { Flag, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { ReportModal } from './components/report-modal'
type Params = { id: string }
type Props = { params: Params }
export default async function Page({ params }: Props) {
	const { fullName, email, username, id } = await getProfile(params.id)
	const session = await auth()
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return (
		<div className="w-full max-w-xl m-auto grid gap-4">
			<Card className="w-full">
				<CardContent className="p-4 space-y-4">
					<div className="flex gap-4 items-center">
						<div className="flex gap-2 w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
							<Avatar>
								<AvatarFallback>{fullName[0]}</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<CardTitle className="text-lg">{fullName}</CardTitle>
							<CardDescription>@{username}</CardDescription>
						</div>
					</div>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="font-semibold flex items-center gap-4">
									<Mail className="w-6 h-6" />
									Email
								</TableCell>
								<TableCell>
									<a className="w-full" href={`mailto:${email}`}>
										{email}
									</a>
								</TableCell>
							</TableRow>
							{session && session.user.id !== id && (
								<TableRow>
									<TableCell className="font-semibold flex items-center gap-4 min-h-full">
										<Flag className="w-6 h-6" />
										Report
									</TableCell>
									<TableCell>
										<ReportModal reportedId={id} />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-4">
					<h4 className="text-lg font-bold">Auction History</h4>
					<div className="grid gap-4 mt-4">
						{Array(3)
							.fill(0)
							.map((_, i) => (
								<MiniAuctionCard
									key={i}
									auction={{
										id: 'dezd',
										categoryId: '',
										description: 'ferfefer',
										title: 'jhfkrhefe',
										endDate: new Date(),
										startDate: new Date(),
										initialPrice: 90.0,
										tags: [],
										userId: 'eer',
									}}
								/>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
