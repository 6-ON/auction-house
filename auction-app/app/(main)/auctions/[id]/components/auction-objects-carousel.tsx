'use client'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselApi,
} from '@/components/ui/carousel'
import { AuctionObject } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
type Props = {
	objects: AuctionObject[]
}
export function AuctionObjectsCarousel({ objects }: Props) {
	const [api, setApi] = React.useState<CarouselApi>()

	const [currenti, setCurrent] = React.useState(0)

	React.useEffect(() => {
		if (api) api.on('select', () => setCurrent(api.selectedScrollSnap()))
	}, [api])

	const currentObject = objects[currenti]

	return (
		<div className="bg-secondary rounded-lg space-y-4 p-2">
			<Carousel className="w-full  max-md:mx-auto" setApi={setApi}>
				<CarouselContent>
					{objects.map(({ id, image }) => (
						<CarouselItem key={id}>
							<Image
								alt="Abstract Vision"
								className="aspect-[4/3] w-full object-cover rounded-lg"
								priority={true}
								height={400}
								src={image}
								width={600}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				{objects.length > 1 && (
					<>
						<CarouselPrevious className="left-1.5" />
						<CarouselNext className="right-1.5" />
					</>
				)}
			</Carousel>
			<div className="grid gap-2 ">
				<h2 className="font-semibold text-xl">{currentObject.title}</h2>
				<p className="text-sm leading-normal text-muted-foreground">{currentObject.description}</p>
			</div>
		</div>
	)
}
