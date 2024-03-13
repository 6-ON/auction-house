'use client'
import { messageSchema } from '@/actions/send-message/schema'
import { InputType as MessageSchema } from '@/actions/send-message/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export function ChatSendArea({ auctionId }: Pick<MessageSchema, 'auctionId'>) {
	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			content: '',
			auctionId,
		},
	})

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
		reset,
	} = form
	const onSubmit: SubmitHandler<MessageSchema> = async (data) => {
		await fetch('/api/messages', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		reset()
	}

	return (
		<div className="border rounded-lg p-4 grid gap-4">
			<form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
				<h3 className="font-semibold text-xl">Send a Message</h3>
				<Textarea className="min-h-[100px]" placeholder="Type your message here." {...register('content')} />
				<Button className="gap-4" type="submit" disabled={isSubmitting}>
					{isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Send'}
				</Button>
			</form>
		</div>
	)
}
