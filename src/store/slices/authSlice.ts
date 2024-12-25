import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../configs/types/auth'
import { User } from '../../configs/types/user'

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
    },
})

export const { login } = authSlice.actions

export default authSlice.reducer
