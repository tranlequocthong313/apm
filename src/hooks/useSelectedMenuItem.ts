import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const useSelectedMenuItem = () => {
    const location = useLocation()
    const [selectedMenuItem, setSelectedMenuItem] = useState(location.pathname)

    useEffect(() => {
        if (selectedMenuItem !== location.pathname) {
            setSelectedMenuItem(location.pathname)
        }
    }, [location, selectedMenuItem])

    return { selectedMenuItem, setSelectedMenuItem }
}

export default useSelectedMenuItem
