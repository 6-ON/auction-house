'use client'
import { useChat } from '@/components/providers/chat-provider'
import { ChatMessages } from './chat-messages'
import { ChatSendArea } from './chat-send-area'
type ChatSectionProps = {
	userBanned: boolean
}
const ChatSection: React.FC<ChatSectionProps> = ({ userBanned }) => {
	const { messages, auctionId } = useChat()
	return (
		<div className="grid gap-4 md:col-span-2">
			<ChatMessages messages={messages} />
			{auctionId && (userBanned ? <></> : <ChatSendArea auctionId={auctionId} />)}
		</div>
	)
}

export default ChatSection
