import { getAuction } from "@/actions/get-auction";
import { getBids } from "@/actions/get-bids";
import { getMessages } from "@/actions/get-messages";
import { getReports } from "@/actions/get-reports";

export type BidWithUser = Awaited<ReturnType<typeof getBids>>[number]
export type MessageWithUser = Awaited<ReturnType<typeof getMessages>>[number]
export type AuctionWithObjects = Awaited<ReturnType<typeof getAuction>>
export type ReportWithReporter = Awaited<ReturnType<typeof getReports>>["reports"][number]