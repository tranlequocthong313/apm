import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const useLogout = () => {
    const dispatch = useDispatch()
    return () => dispatch(logout())
}

export default useLogout
