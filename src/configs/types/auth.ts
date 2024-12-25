import { User } from './user'

export type LoginErrorFields = 'email' | 'password' | 'rememberMe'

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

export interface AuthState {
    user?: User
}
