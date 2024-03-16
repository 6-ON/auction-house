import { z } from 'zod'

export type FieldErrors<T> = {
	[K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
	success: true
	data: TOutput
} | {
	success?: false | undefined
	fieldErrors?: FieldErrors<TInput>
	error?: string | null
}

export const createSafeAction = <TInput, TOutput>(
	schema: z.Schema<TInput>,
	handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
	return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
		const validationResult = schema.safeParse(data)
		if (!validationResult.success) {
			return {
				success :false,
				fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
			}
		}

		return handler(validationResult.data)
	}
}
