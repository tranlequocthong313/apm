import { useSelector } from 'react-redux'
import { IRootState } from '../store'

const useLanguage = () => {
    return useSelector((state: IRootState) => state.setting.language)
}

export default useLanguage
