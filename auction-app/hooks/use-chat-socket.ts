import { getMessages } from '@/actions/get-messages'
import { useSocket } from '@/components/providers/socket-provider'
import { MessageWithUser } from '@/types/app'
import { useEffect, useState } from 'react'

type UseChatSocketOptions = {
	auctionId: string
}

export const useChatSocket = ({ auctionId }: UseChatSocketOptions) => {
	const [messages, setMessages] = useState<MessageWithUser[]>([])
	const { socket, isConnected } = useSocket()
	const chatkey = `chat:${auctionId}`

	useEffect(() => {
		if (auctionId) getMessages(auctionId).then(setMessages)
	}, [auctionId])

	useEffect(() => {
		if (!socket) return

		socket.on(chatkey, (message) => {
			setMessages((messages) => [...messages, message])
		})
		return () => {
			socket.off(chatkey)
		}
	}, [chatkey, socket])
	return { messages, isConnected }
}
