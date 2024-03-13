'use client'
import { useBids } from '@/components/providers/bids-provider'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDisclosure } from '@/hooks/disclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hand, DollarSign, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

function PlaceBidButton() {
	const { isOpen, onOpenChange, onClose } = useDisclosure()
	const { maxBid, auctionId } = useBids()

	const bidSchema = z.object({
		amount: z.coerce
			.number()
			.min(maxBid + 0.1, 'Bid must be higher than the initial price and the current highest bid'),
		auctionId: z.string(),
	})

	type BidForm = z.infer<typeof bidSchema>

	const form = useForm<BidForm>({
		resolver: zodResolver(bidSchema),
		defaultValues: {
			amount: 0,
			auctionId,
		},
	})

	const {
		handleSubmit,
		register,
		setValue,
		reset,
		formState: { errors, isSubmitting },
	} = form

	useEffect(() => setValue('amount', maxBid), [maxBid, setValue])

	const onSubmit: SubmitHandler<BidForm> = async (data) => {
		await fetch('/api/bids', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		onClose()
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={isOpen}>
			<DialogTrigger asChild>
				<Button>
					<Hand className="w-4 h-4 mr-2" />
					Place a Bid
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Place a Bid</DialogTitle>
						<DialogDescription>Enter the amount you would like to bid for this item</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="flex gap-4 items-center">
							<Label htmlFor="name" className="text-right">
								Price
							</Label>
							<div className="relative w-full">
								<DollarSign className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
								<Input
									className="pe-8"
									placeholder="Ex : 1000"
									type="number"
									step={0.1}
									{...register('amount')}
								/>
								<p className="text-sm text-destructive">{errors.amount?.message}</p>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Procced'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default PlaceBidButton
