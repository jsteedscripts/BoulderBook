import { useEffect } from "react"
import { useSendsContext } from "../hooks/useSendsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import SendDetails from '../components/SendDetails'
import SendForm from "../components/SendForm"

const Home = () => {
    const { sends, dispatch } = useSendsContext()
    const { user } = useAuthContext()

    // only fires once (when component is first rendered)
    useEffect(() => {
        const fetchSends = async () => {
            const response = await fetch('/api/sends', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            // get array of "send" objects
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SENDS', payload: json})
            }
        }

        if (user) {
            fetchSends()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="sends">
                {sends && sends.map((send) => (
                    <SendDetails key={send._id}  send={send}/>
                ))}
            </div>
            <SendForm />
        </div>
    )
}

export default Home