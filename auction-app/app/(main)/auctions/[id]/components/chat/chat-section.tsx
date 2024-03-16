'use client'
import { useChat } from '@/components/providers/chat-provider'
import { ChatMessages } from './chat-messages'
import { ChatSendArea } from './chat-send-area'

const ChatSection = () => {
	const { messages, auctionId } = useChat()
	return (
		<div className="grid gap-4 md:col-span-2">
			<ChatMessages messages={messages} />
			{auctionId && <ChatSendArea auctionId={auctionId} />}
		</div>
	)
}

export default ChatSection
