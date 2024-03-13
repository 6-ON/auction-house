import { z } from 'zod'
import { bidSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'
import { BidWithUser } from '@/types/app'

export type InputType = z.infer<typeof bidSchema>
export type OutputType = ActionState<InputType, BidWithUser>
