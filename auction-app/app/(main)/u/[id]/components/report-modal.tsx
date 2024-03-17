'use client'
import { reportUser } from '@/actions/report-user'
import { reportSchema } from '@/actions/report-user/schema'
import { InputType as ReportForm } from '@/actions/report-user/types'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useDisclosure } from '@/hooks/disclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircleQuestion, ShieldQuestion } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const ReportModal: React.FC<Pick<ReportForm, 'reportedId'>> = ({ reportedId }) => {
	const { isOpen, onOpenChange, onClose } = useDisclosure()

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm<ReportForm>({
		resolver: zodResolver(reportSchema),
		defaultValues: {
			reportedId,
			reason: '',
		},
	})
	const onSubmit: SubmitHandler<ReportForm> = async (data) => {
		await reportUser(data)
		onClose()
	}
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button size="sm">Submit</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Report Abuse</DialogTitle>
					<DialogDescription>Help us make Auction House a better place</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Label className="text-md">Reason</Label>
					<Textarea
						className="min-h-52 resize-none"
						rows={10}
						placeholder="Tell us what happend we'll review it ASAP..."
						{...register('reason')}
					/>
					<p className="text-sm text-destructive">{errors.reason?.message}</p>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
