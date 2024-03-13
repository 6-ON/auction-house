'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO, Socket } from 'socket.io-client'

type SocketContextType = {
	socket: Socket | null
	isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
})

export const useSocket = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState(null)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		
		const socketInstance = new (ClientIO as any)(window.location.origin, {
			path: '/api/socket/io',
		})

		socketInstance.on('connect', () => {
			setIsConnected(true)
		})

		socketInstance.on('disconnect', () => {
			setIsConnected(false)
		})

		setSocket(socketInstance)

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}
