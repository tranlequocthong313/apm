import { useSelector } from 'react-redux'
import { IRootState } from '../store'

const useUser = () => {
    return useSelector((state: IRootState) => state.auth.user)
}

export default useUser
