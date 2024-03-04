'use client'

/* Core */
import { Provider } from 'react-redux'
/* Instruments */
import { store } from '@/lib/redux'

export const ReduxProvider = ({ children }: React.PropsWithChildren) => {
	return <Provider store={store}>{children}</Provider>
}
