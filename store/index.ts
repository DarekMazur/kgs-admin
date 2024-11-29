import {configureStore, createSlice} from "@reduxjs/toolkit";
import { usersApi } from './api/users.ts';

export type RootState = ReturnType<typeof store.getState>;

const initialIsLoading: boolean = true;

const isLoadingSlice = createSlice({
	name: 'popup',
	initialState: initialIsLoading,
	reducers: {
		switchIsLoading(_state, action) {
			return action.payload;
		},
	},
});

export const { switchIsLoading } = isLoadingSlice.actions;

export * from './api/users.ts';

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		isLoading: isLoadingSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(usersApi.middleware)
});