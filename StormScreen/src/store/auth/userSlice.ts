import { createSlice } from '@reduxjs/toolkit'

type User = {
	email: string | null
	displayName: string | null
	token: string | null
	id: number | null
	username: string | null,
	photo: string | null
}

const initialState: User = {
	email: null,
	displayName: null,
	token: null,
	id: null,
	username: null,
	photo: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser (state, action) {
			state.id = action.payload.uid;
			state.email = action.payload.email;
			state.token = action.payload.accessToken;
			state.displayName = action.payload.displayName;
			state.username = action.payload.username
			state.photo = action.payload.photoURL
		},
		deleteUser (state) {
			state.id = null;
			state.email = null;
			state.token = null;
			state.displayName = null;
			state.username = null
			state.photo = null
		}
	}
});

export const {setUser, deleteUser} = userSlice.actions

export default userSlice.reducer