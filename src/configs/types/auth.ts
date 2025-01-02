import { User } from './user'

export type LoginErrorFields = 'email' | 'password' | 'rememberMe'
export type SignUpErrorFields = 'email' | 'password' | 'name' | 'address'

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

export interface AuthState {
    user?: User
}
