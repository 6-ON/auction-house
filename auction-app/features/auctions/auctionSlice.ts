import { type InputType as CreateSchema } from '@/actions/create-auction/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuctionState {
	createForm: CreateSchema
}

const initialState: AuctionState = {
	createForm: {
		title: '',
		description: '',
		initialPrice: 0,
		startDate: Date.now(),
		endDate: Date.now(),
		tags: [],
		categoryId: '',
		objects: [],
	},
}

const auctionsSlice = createSlice({
	name: 'auctions',
	initialState,
	reducers: {
		updateCreateForm(state, action: PayloadAction<Partial<CreateSchema>>) {
			state.createForm = { ...state.createForm, ...action.payload }
		},
	},
})

const auctionsReducer = auctionsSlice.reducer
export const { updateCreateForm } = auctionsSlice.actions
export default auctionsReducer
