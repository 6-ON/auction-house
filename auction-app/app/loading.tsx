export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-4">
			<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Loading...</h1>
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	)
}
