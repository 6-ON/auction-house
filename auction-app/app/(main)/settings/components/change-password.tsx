'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { InputType } from '@/actions/update-password/types'
import { TextField } from '@/components/rhf/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePasswordSchema } from '@/actions/update-password/schema'
import { updatePassword } from '@/actions/update-password'
import PwChanged from './password-changed'
import { useToast } from '@/components/ui/use-toast'

const ChangePasswordForm = () => {
	const form = useForm<InputType>({
		resolver: zodResolver(updatePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	})
	const { toast } = useToast()
	const {
		handleSubmit,
		control,
		setError,
		formState: { isSubmitting, isValid },
	} = form
	const onSubmit: SubmitHandler<InputType> = async (data) => {
		const { success, fieldErrors } = await updatePassword(data)
		if (!success && fieldErrors) {
			Object.entries(fieldErrors).forEach(([field, errors]) => {
				setError(field as keyof InputType, { message: errors.join(', ') })
			})
		}
		if (success) {
			toast({
				title: 'Password Updated',
				description: 'Your password has been updated',
			})
		}
	}
	return (
		<Card>
			<CardHeader className="p-4">
				<CardTitle>Change Password</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="p-4 grid gap-4">
						<div className="space-y-2">
							<FormField
								name="currentPassword"
								control={control}
								render={({ field }) => (
									<TextField label="Current Password" type="password" {...field} />
								)}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								name="newPassword"
								control={control}
								render={({ field }) => <TextField label="New Password" type="password" {...field} />}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								name="confirmNewPassword"
								control={control}
								render={({ field }) => (
									<TextField label="Confirm New Password" type="password" {...field} />
								)}
							/>
						</div>
						<Button type="submit" disabled={!isValid || isSubmitting}>
							Update Password
						</Button>
					</CardContent>
				</form>
			</Form>
		</Card>
	)
}

export default ChangePasswordForm
