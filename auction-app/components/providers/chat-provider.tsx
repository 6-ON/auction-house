'use client'
import { getMessages } from '@/actions/get-messages'
import { useChatSocket } from '@/hooks/use-chat-socket'
import { MessageWithUser } from '@/types/app'
import { createContext, useContext } from 'react'


interface IChatConext {
	messages: MessageWithUser[]
	auctionId?: MessageWithUser['auctionId']
}

const ChatContext = createContext<IChatConext>({
	messages: [],
})

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({
	children,
	auctionId,
}: React.PropsWithChildren<{
	auctionId: string
}>) => {
	const { messages } = useChatSocket({ auctionId })
	return <ChatContext.Provider value={{ messages, auctionId }}>{children}</ChatContext.Provider>
}
