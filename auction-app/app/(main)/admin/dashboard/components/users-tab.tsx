import React from 'react'
import { UsersTable } from './tables/users-table'
import { getUsers } from '@/actions/get-users'
import { UsersSearchParams } from '@/actions/get-users/types'
type TabProps = {
	sp: UsersSearchParams
}

export async function UsersTab({ sp }: TabProps) {
	const users = await getUsers(sp)

	return <UsersTable data={users} sp={sp} />
}
