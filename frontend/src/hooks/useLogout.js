import { useAuthContext } from './useAuthContext'
import { useSendsContext } from './useSendsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchSends } = useSendsContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        dispatchSends({type: 'SET_SENDS', payload: null})
    }

    return { logout }
}