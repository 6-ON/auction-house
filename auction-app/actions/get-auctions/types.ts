import { z } from "zod";
import { searchParamsSchema } from "./schema";

export type AuctionSearchParams = z.infer<typeof searchParamsSchema>;