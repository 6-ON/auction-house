import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './styles/globals.css'
import { cn } from '@/lib/utils'
import { ReduxProvider } from '@/components/redux/provider'
import { Toaster } from '@/components/ui/toaster'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Auction House',
	icons: { icon: '/logo.svg', },
	description: 'a live auction platform for buying and selling goods.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReduxProvider>
			<html lang="en">
				<body className={cn('min-h-screen bg-background font-sans antialiased flex flex-col', fontSans.variable)}>
					{children}
					<Toaster />
				</body>
			</html>
		</ReduxProvider>
	)
}
