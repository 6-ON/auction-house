import { useState } from 'react'

export const useDisclosure = () => {
	const [isOpen, setIsOpen] = useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const onToggle = () => setIsOpen((prev) => !prev)
	const onOpenChange = (open: boolean) => setIsOpen(open)

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle,
		onOpenChange,
	}
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
