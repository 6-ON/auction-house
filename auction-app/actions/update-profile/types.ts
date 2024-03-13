import { z } from 'zod'
import { UpdateProfileSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof UpdateProfileSchema>

export type ReturnType = ActionState<InputType, undefined>
