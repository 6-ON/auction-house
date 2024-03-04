/**
 *  support utility for react-hook-form
 * @description looping through the dirtyFields object recursively and getting its value from data.
 */

export function dirtyValues<T>(data: T, dirtyFields: any): Partial<T> {
	return Object.fromEntries(
		Object.entries(dirtyFields)
			.map(([k, v]) => {
				const key = k as keyof T
				if (typeof v === 'object') return [k, dirtyValues(data[key], v!)]
				return [k, data[key]]
			})
			.filter(Boolean)
	)
}
