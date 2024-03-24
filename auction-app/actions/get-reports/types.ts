import { z } from 'zod'
import { searchParamsSchema } from './schema'

export type ReportsSearchParams = z.infer<typeof searchParamsSchema>
