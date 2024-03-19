'use client'
import { stepTwoSchema } from '@/actions/create-auction/schema'
import { InputTypeStepTwo } from '@/actions/create-auction/types'
import ImageFileDrop from '@/components/mine/file-drop'
import { TextField } from '@/components/rhf/TextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { updateCreateForm } from '@/features/auctions/auctionSlice'
import { StepComponent } from '@/hooks/stepper'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, MinusCircle, PlusIcon } from 'lucide-react'
import React from 'react'
import { Controller, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import ConfirmDialog from './confirm-dialog'
import { useDisclosure } from '@/hooks/disclosure'
import { createAuction } from '@/actions/create-auction'
import { useRouter } from 'next/navigation'

type SIT = InputTypeStepTwo

export const CreateAuctionStepTwo: StepComponent = ({ stepper }) => {
	const storedispatch = useAppDispatch()
	const { createForm } = useAppSelector((state) => state.auction)
	const form = useForm<SIT>({
		resolver: zodResolver(stepTwoSchema),
		defaultValues: {
			objects: createForm.objects,
		},
	})
	const router = useRouter()
	const confirmDisclosure = useDisclosure()

	const { control, handleSubmit } = form

	const { fields, prepend, remove } = useFieldArray({
		control,
		name: 'objects', // unique name for your Field Array
	})
	const onSubmit: SubmitHandler<SIT> = (data) => {
		storedispatch(updateCreateForm(data))
		confirmDisclosure.onOpen()
	}
	const onError: SubmitErrorHandler<SIT> = (data) => {}
	const onCreateConfirmed = async () => {
		const rlst = await createAuction(createForm)
		if (rlst.success) router.replace(`/auctions/${rlst.data.id}`)
	}
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-3 items-center ">
					<button
						type="button"
						className="w-full hover:bg-muted max-w-sm mx-auto h-[34.5rem] rounded-sm border-dashed  border-2 flex items-center justify-center space-x-2"
						onClick={() => {
							prepend({
								title: '',
								description: '',
								image: '',
							})
						}}
					>
						<PlusIcon className="w-8 h-8 mr-2" />
						Add Object
					</button>
					{fields.map((field, index) => (
						<Card className="w-full max-w-sm mx-auto relative" key={field.id}>
							<MinusCircle
								className="absolute -right-4 -top-4 fill-red-500 text-white cursor-pointer"
								size={32}
								onClick={() => remove(index)}
							/>
							<div className="grid gap-4 p-6">
								<Controller
									render={(props) => <ImageFileDrop {...props} />}
									control={control}
									name={`objects.${index}.image`}
								/>
								<div className="space-y-2">
									<FormField
										render={({ field }) => <TextField label="Title" {...field} />}
										control={control}
										name={`objects.${index}.title`}
									/>
								</div>
								<div className="space-y-2">
									<FormField
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														className="min-h-[100px] resize-none"
														placeholder="Enter the description"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
										control={control}
										name={`objects.${index}.description`}
									/>
								</div>
							</div>
						</Card>
					))}
				</div>

				<div className="flex justify-end py-4 gap-5">
					<Button variant="ghost" type="button" onClick={() => stepper.onBack()} className="gap-2">
						<ArrowLeft />
						Back
					</Button>
					<ConfirmDialog disclosure={confirmDisclosure} onConfirm={onCreateConfirmed} />
					<Button type="submit" className="gap-2">
						Next
						<ArrowRight />
					</Button>
				</div>
			</form>
		</Form>
	)
}
