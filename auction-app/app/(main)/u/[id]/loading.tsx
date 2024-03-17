import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
	return (
		<div className="w-full max-w-xl m-auto grid gap-4">
			<Card className="w-full">
				<CardContent className="p-4 space-y-4">
					<div className="flex gap-4 items-center">
						<div className="flex gap-2 w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
							<Skeleton className="w-12 h-12 rounded-full" />
						</div>
						<div className='space-y-4'>
							<Skeleton className="w-20 h-4" />
							<Skeleton className="w-12 h-4" />
						</div>
					</div>
					<div className="flex gap-16">
						<Skeleton className="w-20 h-6" />
						<Skeleton className="w-48 h-6" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-4">
					<h4 className="text-lg font-bold">Auction History</h4>
					<div className="grid gap-4 mt-4">
						{Array(3)
							.fill(0)
							.map((_, i) => (
                <Skeleton key={i} className="w-full h-20" />
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default Loading
