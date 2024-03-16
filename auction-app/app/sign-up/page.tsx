import { Metadata } from 'next'

import { SignUpForm } from './components/form'

export const metadata: Metadata = {
	title: 'Sign Up',
}

export default function SignUpPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col p-8 rounded-xl border items-center">
				<h4 className="text-2xl font-bold">Sign Up</h4>
				<p className="text-muted-foreground mb-8">Create an account to start bidding freely</p>
				<SignUpForm />
			</div>
		</div>
	)
}
