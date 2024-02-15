import { z } from "zod"
import { signUpSchema,  } from "./schema"
import { ActionState } from "@/lib/create-safe-action";


export type SignUpSchema = z.infer<typeof signUpSchema>

export type ReturnType = ActionState<SignUpSchema, any >;