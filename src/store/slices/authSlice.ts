import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../configs/types/auth'
import { User } from '../../configs/types/user'

const initialState: AuthState = {
    user: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        logout(state) {
            state.user = undefined
        }
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
