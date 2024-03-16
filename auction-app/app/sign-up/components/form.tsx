'use client'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { TextField } from '@/components/rhf/TextField'
import { signUpSchema } from '@/actions/create-user/schema'
import { createUser } from '@/actions/create-user'
import Link from 'next/link'
import { SignUpSchema } from '@/actions/create-user/types'
import { useRouter } from 'next/navigation'

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
	const router = useRouter()
	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: '',
			username: '',
			email: '',
			password: '',
		},
	})
	const {
		handleSubmit,
		control,
		setError,
		formState: { isSubmitting },
	} = form
	const onSubmit: SubmitHandler<SignUpSchema> = async (formData) => {
		const rlst = await createUser(formData)
		if (rlst.success) return router.push('/sign-in')
		const { error, fieldErrors } = rlst
		Object.entries(fieldErrors || {}).forEach(([field, errors]) => {
			setError(field as keyof SignUpSchema, { message: errors.join(', ') })
		})
		console.error(error)
	}

	return (
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-2 w-80">
						<div className="grid gap-1">
							<FormField
								render={({ field }) => (
									<TextField label="Full Name" type="text" placeholder="John Doe" {...field} />
								)}
								name="fullName"
								control={control}
							/>
							<FormField
								render={({ field }) => (
									<TextField label="Username" type="text" placeholder="johndoe" {...field} />
								)}
								name="username"
								control={control}
							/>
							<FormField
								render={({ field }) => (
									<TextField label="Email" type="email" placeholder="johnDoe@email.me" {...field} />
								)}
								name="email"
								control={control}
							/>
							<FormField
								render={({ field }) => (
									<TextField label="Password" type="password" placeholder="********" {...field} />
								)}
								name="password"
								control={control}
							/>
						</div>
						<Button disabled={isSubmitting} type="submit">
							{isSubmitting && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Sign Up
						</Button>
						<Link href="/sign-in" className="w-fit" type="button">
							Already have an account ? Sign In
						</Link>
					</div>
				</form>
			</Form>
	)
}
