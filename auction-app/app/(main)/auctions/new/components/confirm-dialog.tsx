'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { UseDisclosureReturn } from '@/hooks/disclosure'

const ConfirmDialog: React.FC<{
	onConfirm: () => void
	disclosure: UseDisclosureReturn
}> = ({ onConfirm, disclosure: { isOpen, onOpenChange } }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>do you confirm this action ?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={() => onConfirm()}>Confirm</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmDialog
