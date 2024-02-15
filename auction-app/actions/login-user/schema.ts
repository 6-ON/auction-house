import { signUpSchema } from '../create-user/schema'

export const signInSchema = signUpSchema.pick({ email: true, password: true })
