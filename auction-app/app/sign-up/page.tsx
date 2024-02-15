import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/components/common'
import { SignUpForm } from './components/form'

export const metadata: Metadata = {
	title: 'Sign Up',
}

export default function SignUpPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Logo />
			<SignUpForm />
		</div>
	)
}
