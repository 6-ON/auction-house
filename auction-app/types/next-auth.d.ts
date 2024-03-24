import NextAuth from 'next-auth'
import { User } from '@prisma/client'

type UserInfo = Omit<User, 'password' | 'fullName'>
declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: Omit<User, 'password' | 'fullName'>
	}
	interface User extends UserInfo {}
}
