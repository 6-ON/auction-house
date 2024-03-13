import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from '@/components/ui/pagination'
import { GetAuctionsResult } from '@/actions/get-auctions'
import { AuctionSearchParams } from '@/actions/get-auctions/types'
type Props = {
	searchParams: AuctionSearchParams
	meta: GetAuctionsResult['meta']
}
export function PaginationArea({ searchParams, meta }: Props) {
	const { currentPage, nextPage, pageSize, prevPage, totalItems, totalPages } = meta
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={{ query: { ...searchParams, page: prevPage } }} />
				</PaginationItem>
				{Array(totalPages)
					.fill(0)
					.map((_, i) => (
						<PaginationItem key={i}>
							<PaginationLink
								href={{ query: { ...searchParams, page: i + 1 } }}
								isActive={currentPage === i + 1}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}

				<PaginationItem>
					<PaginationNext href={{ query: { ...searchParams, page: nextPage } }} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
