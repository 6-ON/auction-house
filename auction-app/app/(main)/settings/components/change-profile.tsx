'use client'
import { InputType } from '@/actions/update-profile/types'
import { Profile } from '@/actions/get-user'
import { TextField } from '@/components/rhf/TextField'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { dirtyValues } from '@/lib/rhf'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateProfile } from '@/actions/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateProfileSchema } from '@/actions/update-profile/schema'
import { icons } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
type FormProps = {
	profile: Profile
}

const ChangeProfileForm: React.FC<FormProps> = ({ profile }) => {
	const form = useForm<InputType>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: profile,
	})
	const { toast } = useToast()
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields, isSubmitting, isDirty, isValid },
	} = form
	const onSubmit = async (data: InputType) => {
		const updated = dirtyValues(data, dirtyFields)
		const result = await updateProfile(updated)
		if (result.success) {
			toast({
				title: 'Profile Updated',
				description: 'Your profile has been updated',
			})
		}
	}
	useEffect(() => {
		reset(profile)
	}, [profile, reset])

	return (
		<Card>
			<CardHeader className="p-4">
				<CardTitle>Account Information</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<FormField
								render={({ field }) => <TextField label="Full Name" {...field} />}
								name="fullName"
								control={control}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								render={({ field }) => <TextField label="Username" {...field} />}
								name="username"
								control={control}
							/>
						</div>
						<Button className="w-full" type="submit" disabled={!isDirty || !isValid || isSubmitting}>
							{isSubmitting && <icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save
						</Button>
					</CardContent>
				</form>
			</Form>
		</Card>
	)
}

export default ChangeProfileForm
