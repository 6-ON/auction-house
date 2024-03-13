import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MessageWithUser } from '@/types/app'
import { formatRelative } from 'date-fns'
import React from 'react'

type Props = {
	isLastest: boolean
	message: MessageWithUser
}
// @ts-ignore
export function ChatMessage({ isLastest, message }: Props) {
	const { sender, content, createdAt } = message
	return (
		<>
			<div className="flex items-start gap-4">
				<Avatar className="w-10 h-10">
					<AvatarFallback>{sender.fullName.toUpperCase().substring(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="grid gap-1">
					<div className="flex items-center gap-2">
						<h4 className="font-semibold text-base">{sender.fullName}</h4>
						<p className="text-gray-500 text-sm">{formatRelative(createdAt, new Date())}</p>
					</div>
					<p className="text-sm leading-normal">{content}</p>
				</div>
			</div>
			{!isLastest && <Separator />}
		</>
	)
}
