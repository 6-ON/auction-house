import { z } from 'zod'
import { User } from '@prisma/client'
import { signInSchema } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type SignInSchema = z.infer<typeof signInSchema>
export type ReturnType = ActionState<SignInSchema, Omit<User,'password'>>
