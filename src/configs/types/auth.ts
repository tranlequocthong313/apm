export type LoginErrorFields = 'email' | 'password' | 'rememberMe'

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}
