import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'
import { User } from '../configs/types/user'

const useLogin = () => {
    const dispatch = useDispatch()
    return (user: User) => dispatch(login(user))
}

export default useLogin
