'use client'
import React, { useEffect, useRef } from 'react'
import { ChatMessage } from './chat-message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageWithUser } from '@/types/app'
type Props = {
	messages: MessageWithUser[]
}

export function ChatMessages({ messages }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		ref.current?.scrollTo({ top: ref.current?.scrollHeight, behavior: 'smooth' })
	}, [messages])
	return (
		<ScrollArea className="border h-[30rem] rounded-lg px-4 scroll-smooth" ref={ref}>
			<div className="py-2 grid gap-4">
				{messages.map((message, i) => (
					<ChatMessage key={message.id} isLastest={messages.length === i + 1} message={message} />
				))}
			</div>
		</ScrollArea>
	)
}
