import { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			console.log(nextUrl.pathname)

			const isPublicRoute = /(^\/$|^\/auctions$)/.test(nextUrl.pathname)
			const isAuthRoute = /(^\/sign-(in|up)$)/.test(nextUrl.pathname)
			const isLoggedIn = !!auth?.user
			// return isLoggedIn

			// check if the route is public
			if (isPublicRoute) return true

			// check if user is logged in
			if (!isLoggedIn) {
				// authorize auth routes
				if (isAuthRoute) return true
				return false
			} else if (isAuthRoute) return Response.redirect(new URL('/', nextUrl))
		},
	},
	pages: {
		signIn: '/sign-in',
	},
	secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig
