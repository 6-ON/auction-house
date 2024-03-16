import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
	return (
		<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
			<div className="flex justify-between">
				<Skeleton className="h-6 w-1/4" />
				<Skeleton className="h-6 w-1/4" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array(12)
					.fill(0)
					.map((_, i) => (
						<div className="rounded-lg border p-4" key={i}>
							<Skeleton className="h-6 w-1/4 mb-4" />
							<Skeleton className="h-4 w-3/4 mb-2" />
							<Skeleton className="h-40 w-full mb-4" />
							<Skeleton className="h-6 w-1/2 mb-2" />
							<Skeleton className="h-4 w-1/3" />
						</div>
					))}
			</div>
		</div>
	)
}

export default Loading
