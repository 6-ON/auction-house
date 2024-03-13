import { z } from 'zod'
import { updatePasswordSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof updatePasswordSchema>
export type ReturnType = ActionState<InputType, undefined>
