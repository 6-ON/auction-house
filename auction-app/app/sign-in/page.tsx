import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/components/common'
import { SignInForm } from './component/form'

export const metadata: Metadata = {
	title: 'Sign In',
}

export default function SignInPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Logo />
			<SignInForm />
		</div>
	)
}
