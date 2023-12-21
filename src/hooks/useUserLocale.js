import { useMemo } from 'react'
import { useSelector } from 'react-redux'

function useUserLocale() {
    const { userLocale } = useSelector((state) => state.user)
    const Language = useMemo(() => {
        let language;
        if (userLocale) {
            console.log("userLocale", userLocale);
            language = userLocale.substring(0, 2)
        } else {
            language = 'en'
        }
        return language
    }, [userLocale])
    return Language
}

export default useUserLocale