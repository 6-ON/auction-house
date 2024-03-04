import { useState } from 'react'

export interface UseStepperOptions {
	steps: StepOptions[]
}

export interface StepOptions {
	title: string
	desctiption: string
	Component: StepComponent
}

export const useStepper = ({ steps }: UseStepperOptions) => {
	if (!steps.length) throw new Error('Stepper must have at least one step.')

	const [activeIndex, setActiveIndex] = useState<number>(0)

	// methods

	const onNext = () => activeIndex + 1 < steps.length && setActiveIndex((prevActiveStep) => prevActiveStep + 1)
	const onBack = () => activeIndex > 0 && setActiveIndex((prevActiveStep) => prevActiveStep - 1)
	const onReset = () => setActiveIndex(0)

	const ActiveStep = steps[activeIndex]

	return {
		ActiveStep,
		activeIndex,
		onNext,
		onBack,
		onReset,
	}
}
export type UseStepperReturn = ReturnType<typeof useStepper>
export type StepComponent = React.FC<{ stepper: UseStepperReturn }>
