import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className="max-w-7xl w-full mx-auto my-8 p-4">
			<div className="flex gap-8">
				<div className="w-1/2">
					<Skeleton className="h-12 w-3/4" />
					<Skeleton className="h-4 w-1/4 mt-2" />
					<div className="mt-4 p-4 border rounded">
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-full mt-2" />
					</div>
					<div className="mt-4">
						<Skeleton className="h-96 w-full" />
						<Skeleton className="h-12 w-full mt-4" />
						<Skeleton className="h-4 w-3/4 mt-2" />
					</div>
				</div>
				<div className="w-1/2">
					<Skeleton className="h-10 w-full" />

					<div className="mt-4 p-4 border rounded">
						<Skeleton className="h-6 w-1/4" />
						<div className="space-y-4 mt-2">
							<Skeleton className="h-6 w-3/4" />
							<Skeleton className="h-6 w-3/4" />
						</div>
					</div>
					<div className="mt-4 p-4 border rounded">
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</div>
		</div>
	)
}
