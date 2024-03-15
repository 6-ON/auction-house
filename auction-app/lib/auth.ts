import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUser } from '@/actions/login-user'
import { db } from './db'
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
				session.user.id = token.sub!
				session.user.name= (await db.user.findUnique({where: {id: token.sub!}}))?.fullName
				
			}
			return session
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.sub = user.id
			}
			return token
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
				if(!rlst.success) return null
				console.log('-----------------------logged in---------------------------')
				return rlst.data!
			},
		}),
	],
})
