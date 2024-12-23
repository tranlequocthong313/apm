import axios from 'axios'

export const authHttp = () => {
    const token = localStorage.getItem('accessToken')
    return axios.create({
        baseURL: 'http://localhost:8070/',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const http = axios.create({
    baseURL: 'http://localhost:8070/'
})
