'use server'

import { db } from "@/lib/db"

export const getCategories = async () => {
	return await db.category.findMany()
}
