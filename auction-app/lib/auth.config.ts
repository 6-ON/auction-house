import { NextAuthConfig } from 'next-auth'
import { authRoutes, publicRoutes } from './routes'

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {

			const isLoggedIn = !!auth?.user
			const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
			const isAuthRoute = authRoutes.includes(nextUrl.pathname)
			
			// check if the route is public
			if (isPublicRoute) return true

			// check if the route is public
			if (!isLoggedIn) {
				// authrize auth routes
				if (isAuthRoute) return true
				return false
			} else if (isAuthRoute) return Response.redirect(new URL('/', nextUrl))

			return true
		},
	},
	pages: {
		signIn: '/sign-in',
	},
	secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig
