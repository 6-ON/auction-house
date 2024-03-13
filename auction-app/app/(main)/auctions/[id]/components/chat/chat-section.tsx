'use client'
import { useEffect, useState } from 'react'
import { ChatMessages } from './chat-messages'
import { ChatSendArea } from './chat-send-area'
import { getMessages } from '@/actions/get-messages'
import { useChatSocket } from '@/hooks/use-chat-socket'

type TMessasge = Awaited<ReturnType<typeof getMessages>>

const ChatSection = ({ auctionId }: { auctionId: string }) => {
	const { messages } = useChatSocket({ auctionId })
	return (
		<div className="grid gap-4 md:col-span-2">
			<h3 className="font-semibold text-xl">Chat</h3>
			<ChatMessages messages={messages} />
			<ChatSendArea auctionId={auctionId}  />
		</div>
	)
}

export default ChatSection
