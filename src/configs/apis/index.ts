import axios from 'axios'
import AUTH_ENDPOINT from './endpoints/auth'
import { LoginResponse } from '../types/auth'
import { store } from '../../store'
import { logout } from '../../store/slices/authSlice'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8070/'
})

export const refreshToken = async (): Promise<string> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(AUTH_ENDPOINT.refreshToken, {
            refreshToken: localStorage.getItem('refreshToken'),
        })
        const { accessToken, refreshToken } = response.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        return accessToken
    } catch {
        throw new Error('Failed to refresh token')
    }
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const newAccessToken = await refreshToken()
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError)
                store.dispatch(logout())
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)


export default axiosInstance
