'use client'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { TextField } from '@/components/rhf/TextField'
import { signInSchema } from '@/actions/login-user/schema'
import Link from 'next/link'
import { SignInSchema } from '@/actions/login-user/types'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
	const sp = useSearchParams()
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = form
	const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
		await signIn('credentials', data)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-2 w-80">
						<div className="grid gap-1">
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
							Sign In
						</Button>
						<Link href="/sign-up" className="w-fit" type="button">
							Create an account ?
						</Link>
					</div>
				</form>
			</Form>
			{/* <div className="relative">
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
					<Icons.XIcon className="mr-2 h-4 w-4" />
				)}
				Twitter
			</Button> */}
			<span className="text-destructive">{sp?.get('error') === 'CredentialsSignin' && 'Wrong credentials'}</span>
		</div>
	)
}
