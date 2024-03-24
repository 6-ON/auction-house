import { auth } from '@/lib/auth'
import Stepper from './components/stepper'
import { redirect } from 'next/navigation'

export default async function AuctionCreatePage() {
	const currentSession= await auth()
	if(currentSession?.user.isBanned) redirect('/auctions')
	return (
		<div className="w-full max-w-4xl m-auto p-4">
			<Stepper />
		</div>
	)
}
