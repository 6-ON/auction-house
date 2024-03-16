import { z } from 'zod'
import { messageSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof messageSchema>
export type ReturnType = ActionState<InputType, any >;
