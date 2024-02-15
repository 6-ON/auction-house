'use client'
import { cn } from '@/lib/utils'
import { icons as Icons } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { TextField } from '@/components/rhf/TextField'
import { signUpSchema } from '@/actions/create-user/schema'
import { createUser } from '@/actions/create-user'
import Link from 'next/link'
import { SignUpSchema } from '@/actions/create-user/types'
import { signIn } from '@/lib/auth'
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
		const { error, success, fieldErrors } = await createUser(formData)
		if (fieldErrors)
			Object.entries(fieldErrors).forEach(([field, errors]) => {
				setError(field as keyof SignUpSchema, { message: errors.join(', ') })
			})
		if (success) router.push('/sign-in')
		if (error) console.error(error)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-2">
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
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isSubmitting}>
				{isSubmitting ? (
					<Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.Twitter className="mr-2 h-4 w-4" />
				)}
				Twitter
			</Button>
		</div>
	)
}
