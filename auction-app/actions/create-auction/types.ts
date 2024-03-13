import { z } from 'zod'
import { createAuctionSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'
import { AuctionWithObjects } from '@/types/app'

export type InputType = z.infer<typeof createAuctionSchema>
export type InputTypeStepOne = Omit<InputType, 'objects'>
export type InputTypeStepTwo = Pick<InputType, 'objects'>
export type ReturnType = ActionState<InputType, AuctionWithObjects >;