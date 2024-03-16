import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './styles/globals.css'
import { cn } from '@/lib/utils'
import { ReduxProvider } from '@/components/redux/provider'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Auction House',
	icons: { icon: '/logo.svg' },
	description: 'a live auction platform for buying and selling goods.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReduxProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={cn('min-h-screen bg-background font-sans antialiased flex flex-col', fontSans.variable)}
				>
					<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ReduxProvider>
	)
}
