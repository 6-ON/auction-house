'use client'

import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { TextField } from '@/components/rhf/TextField'
import { StepComponent } from '@/hooks/stepper'
import { ArrowRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepOneSchema } from '@/actions/create-auction/schema'
import { InputTypeStepOne } from '@/actions/create-auction/types'
import { format } from 'date-fns'
import { type Tag as TagType, TagInput } from '@/components/tag-input/tag-input'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { updateCreateForm } from '@/features/auctions/auctionSlice'
import { Category } from '@prisma/client'
import { getCategories } from '@/actions/get-categories'

export const CreateAuctionStepOne: StepComponent = ({ stepper }) => {
	const storedispatch = useAppDispatch()
	const { objects, ...storedForm } = useAppSelector((state) => state.auction.createForm)
	const [categories, setCategories] = useState<Category[]>()

	const form = useForm<InputTypeStepOne>({
		resolver: zodResolver(stepOneSchema),
		defaultValues: storedForm,
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = form

	const onSubmit = (data: any) => {
		storedispatch(updateCreateForm(data))
		stepper.onNext()
	}
	const onError = (errors: any) => {
	}
	useEffect(() => {
		getCategories().then((cats) => setCategories(cats))
	}, [])

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<FormField
							render={({ field }) => <TextField label="Title" {...field} />}
							control={control}
							name="title"
						/>
					</div>
					<div className="space-y-2">
						<FormField
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose a category ex: Art" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories?.map((cat) => (
												<SelectItem key={cat.id} value={cat.id}>
													{cat.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
							control={control}
							name="categoryId"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<FormField
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										className="min-h-[100px]"
										placeholder="Enter the description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						control={control}
						name="description"
					/>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<FormField
							render={({ field }) => (
								<TextField
									label="Initial Price"
									placeholder=" Enter the initial price"
									type="number"
									step="0.1"
									{...field}
								/>
							)}
							control={control}
							name="initialPrice"
						/>
					</div>
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="tags"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel className="text-left">Tags</FormLabel>
									<FormControl>
										<TagInput
											{...field}
											inputFieldPostion="top"
											placeholder="Enter a topic"
											tags={field.value.map((v) => ({
												id: crypto.randomUUID(),
												text: v,
											}))}
											setTags={(nT) => {
												const newTags = nT as TagType[]
												setValue(
													'tags',
													newTags.map((t) => t.text)
												)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-2">
						<FormField
							render={({ field: { onChange, value, ...field } }) => (
								<TextField
									label="Start Date"
									type="datetime-local"
									step="1"
									value={format(value, "yyyy-MM-dd'T'HH:mm:ss")}
									onChange={(e) => onChange(e.target.valueAsNumber)}
									{...field}
								/>
							)}
							control={control}
							name="startDate"
						/>
					</div>
					<div className="space-y-2">
						<FormField
							render={({ field: { onChange, value, ...field } }) => (
								<TextField
									label="End Date"
									type="datetime-local"
									step="1"
									value={format(value, "yyyy-MM-dd'T'HH:mm:ss")}
									onChange={(e) => onChange(e.target.valueAsNumber)}
									{...field}
								/>
							)}
							control={control}
							name="endDate"
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 justify-end">
					<Button type="submit" size="lg" className="gap-2">
						Next
						<ArrowRight />
					</Button>
				</div>
			</form>
		</Form>
	)
}
