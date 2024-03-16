import { Metadata } from 'next'
import { SignInForm } from './component/form'

export const metadata: Metadata = {
	title: 'Sign In',
}

export default function SignInPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="border p-8 flex flex-col justify-center items-center rounded-xl">
				<h4 className="text-2xl font-bold">Sign In</h4>
				<p className="text-muted-foreground mb-8">Welcome back, please sign in to your account</p>
				<SignInForm />
			</div>
		</div>
	)
}
