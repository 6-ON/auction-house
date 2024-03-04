'use client'

import { cn } from '@/lib/utils'
import { ImageDown, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ControllerFieldState, ControllerRenderProps, UseFormRegisterReturn, UseFormStateReturn } from 'react-hook-form'

type ImageFileDrop = {
	field: ControllerRenderProps<any, any>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<any>
}

const ImageFileDrop: React.FC<ImageFileDrop> = ({ field, fieldState, formState }) => {
	const [isOver, setIsOver] = React.useState(false)

	const dragEnter: React.DragEventHandler<HTMLLabelElement> = (e) => {
		setIsOver(true)
	}
	const dragLeave: React.DragEventHandler<HTMLLabelElement> = (e) => {
		setIsOver(false)
	}
	const dragOver: React.DragEventHandler<HTMLLabelElement> = (e) => e.preventDefault() //only used to prevent image from opening  in the browser

	const handleFileDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault() // also used to prevent image from opening in the browser
		console.log('onDrop', e.dataTransfer.files)
		uploadFile(e.dataTransfer.files[0]).then((url: string) => {
			field.onChange(url)
		})
	}

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log('file input changed', e.target.files)
		const file = e.target.files?.[0]
		if (file)
			uploadFile(file).then((url: string) => {
				field.onChange(url)
			})
	}

	const uploadFile = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		const res = await fetch('http://localhost:5000/upload', {
			method: 'POST',
			body: formData,
		})
		const { url } = await res.json()
		return url
	}

	return (
		<label
			onDrop={handleFileDrop}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			className={cn(
				'flex flex-col overflow-hidden cursor-pointer justify-center items-center w-full h-60 border-dashed border-2 rounded-lg border-gray-200 dark:border-gray-800',
				{
					'border-red-600': fieldState.invalid,
				}
			)}
		>
			<input type="file" hidden onChange={handleFileChange} accept="image/*" />
			{!field.value ? (
				<>
					{!isOver ? <ImageIcon className="w-8 h-8 mr-2" /> : <ImageDown className="w-8 h-8" />}
					<span
						className={cn('text-sm font-medium text-gray-500 dark:text-gray-400', {
							'text-red-600': fieldState.invalid,
						})}
					>
						Drag and drop an image or click to upload.
					</span>
				</>
			) : (
				<Image
					src={field.value}
					alt="image"
					width={700}
					height={100}
					className="w-full h-full hover:opacity-20"
				/>
			)}
		</label>
	)
}

export default ImageFileDrop
