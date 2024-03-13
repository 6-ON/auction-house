'use server'

import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

const handler = async (id: string) => {
	try {
		return await db.auction.findUniqueOrThrow({
			where: {
				id,
			},
			include: {
				objects: true,
			},
		})
	} catch (error) {
        notFound()        
    }
}

export const getAuction = handler
