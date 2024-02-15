import NextAuth from 'next-auth'
import { authConfig } from './lib/auth.config'

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
export default NextAuth(authConfig).auth
