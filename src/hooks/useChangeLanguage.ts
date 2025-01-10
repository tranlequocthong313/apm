import { useDispatch } from 'react-redux'
import { changeLanguage } from '../store/slices/settingSlice'

const useChangeLanguage = () => {
    const dispatch = useDispatch()
    return (lang: string) => dispatch(changeLanguage(lang))
}

export default useChangeLanguage
