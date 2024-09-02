import { createSlice } from '@reduxjs/toolkit'

type User = {
	email: string | null
	displayName: string | null
	token: string | null
	id: number | null
}

const initialState: User = {
	email: null,
	displayName: null,
	token: null,
	id: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser (state, action) {
			state.id = action.payload.uid;
			state.email = action.payload.email;
			state.token = action.payload.refreshToken;
			state.displayName = action.payload.displayName;
		},
		deleteUser (state) {
			state.id = null;
			state.email = null;
			state.token = null;
			state.displayName = null;
		}
	}
});

export const {setUser, deleteUser} = userSlice.actions

export default userSlice.reducer