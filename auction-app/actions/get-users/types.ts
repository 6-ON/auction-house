import { z } from "zod";
import { searchParamsSchema } from "./schema";

export type UsersSearchParams = z.infer<typeof searchParamsSchema>;