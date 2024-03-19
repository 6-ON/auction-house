import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import React from 'react'
import ChangeProfileForm from './components/change-profile'
import { Profile, getProfile } from '@/actions/get-user'
import ChangePasswordForm from './components/change-password'
export const metadata: Metadata = {
	title: 'Profile',
}
export default async function Profile() {
	const session = (await auth())!
	const profile: Profile = (await getProfile(session.user.id!))!

	return (
		<div className="w-full max-w-4xl m-auto flex justify-center  ">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<CardTitle>Profile Settings</CardTitle>
					<CardDescription>Manage your account settings and preferences.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<ChangeProfileForm profile={profile} />
					</div>
					<div>
						<ChangePasswordForm />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
