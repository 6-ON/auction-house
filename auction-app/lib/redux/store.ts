import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux'
import { reducer } from './rootReducer'

export const store = configureStore({
	reducer,
})

/* Hooks */
export const useAppDispatch = () => useDispatch<ReduxDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector

/* Types */
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispatch = typeof store.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>
