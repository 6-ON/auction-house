import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className="max-w-3xl w-full m-auto p-6 bg-white rounded-lg border ">
			<h1 className="text-2xl font-bold mb-1.5">Profile Settings</h1>
			<p className="text-sm mb-6">Manage your account settings and preferences.</p>
			<div className="mb-8">
				<h2 className="text-lg font-semibold mb-4">Account Information</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Full Name</label>
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Username</label>
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
					<Button className="mt-4 w-full" variant="default" disabled>
						Save
					</Button>
				</div>
			</div>
			<div>
				<h2 className="text-lg font-semibold mb-4">Change Password</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Current Password</label>
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">New Password</label>
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Confirm New Password</label>
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
					<Button className="mt-4 w-full" variant="default" disabled>
						Update Password
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Loading
