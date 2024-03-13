'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { icons } from 'lucide-react'
export function SearchAuctions() {
	const router = useRouter()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const search = formData.get('q')
		router.push(`/auctions?q=${search}`)
	}
	return (
		<form className="flex space-x-2" onSubmit={handleSubmit}>
			<Input placeholder="Search for auctions ..." name="q" />
			<Button variant="secondary">Search</Button>
		</form>
	)
}

export function SearchAuctionsAlt({ defaultValue = '' }: { defaultValue?: string }) {
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const search = formData.get('q')
		if (!search) return router.push('/auctions')
		router.push(`/auctions?q=${search}`)
	}
	return (
		<form className="relative" onSubmit={handleSubmit}>
			<icons.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
			<Input className="pl-8" name="q" placeholder="Search for auctions..." defaultValue={defaultValue} />
		</form>
	)
}
