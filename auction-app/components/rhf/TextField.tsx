'use client'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ControllerRenderProps } from 'react-hook-form'
import React from 'react'

type FieldProps = ControllerRenderProps &
	React.InputHTMLAttributes<HTMLInputElement> & {
		label: string
	}

export const TextField = React.forwardRef<HTMLInputElement, FieldProps>(({ label, ...props }, ref) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Input {...props} ref={ref} />
			</FormControl>
			<FormMessage />
		</FormItem>
	)
})

TextField.displayName = 'TextField'