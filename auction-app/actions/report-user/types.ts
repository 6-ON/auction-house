import { z } from 'zod'
import { reportSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof reportSchema>
export type ReturnType = ActionState<InputType, undefined>
