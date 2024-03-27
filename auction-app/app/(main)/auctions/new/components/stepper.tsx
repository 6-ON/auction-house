'use client'

import { StepOptions, useStepper } from '@/hooks/stepper'
import React from 'react'
import { CreateAuctionStepOne } from './create-auction-step-1'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateAuctionStepTwo } from './create-auction-step-2'

const steps: StepOptions[] = [
	{
		title: 'Auction Details',
		desctiption: 'fill in the details of the auction',
		Component: CreateAuctionStepOne,
	},
	{
		title: 'Add Objects',
		desctiption: 'add objects to the auction',
		Component: CreateAuctionStepTwo,
	},
]

const Stepper = () => {
	const stepper = useStepper({ steps })
	const { ActiveStep, activeIndex } = stepper
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl max-md:text-center">
					Step {activeIndex + 1} : {ActiveStep.title}
				</CardTitle>
				<CardDescription>{ActiveStep.desctiption}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<ActiveStep.Component stepper={stepper} />
			</CardContent>
		</Card>
	)
}

export default Stepper
