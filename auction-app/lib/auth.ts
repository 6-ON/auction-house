import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUser } from '@/actions/login-user'
import { db } from './db'
import { getUser } from '@/actions/get-user'
export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	...authConfig,
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				const user = await getUser(token.sub!)
				if (!user) return session
				const { password, fullName, ...rest } = user
				session.user = { ...session.user, ...rest, name: fullName }
			}
			return session
		},
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Username', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize({ email, password }: any, req) {
				console.log('----------------------loggin in ---------------------------')
				const rlst = await loginUser({ email, password })
				if (!rlst.success) return null
				console.log('-----------------------logged in---------------------------')
				return rlst.data!
			},
		}),
	],
})
