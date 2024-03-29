import { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isPublicRoute = /(^\/$|^\/auctions$)/.test(nextUrl.pathname)
			const isAuthRoute = /(^\/sign-(in|up)$)/.test(nextUrl.pathname)
			const isLoggedIn = !!auth?.user			
			// check if the route is public
			if (isPublicRoute) return true
			// if the user is logged in and the route is auth, redirect to the home page
			if (isLoggedIn) {
				const callbackUrl = nextUrl.searchParams.get('callbackUrl')
				if (isAuthRoute) return Response.redirect(new URL(callbackUrl ?? '/', nextUrl))
				return true
			}
			return isAuthRoute
		},
	},
	pages: {
		signIn: '/sign-in',
	},
	secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig
