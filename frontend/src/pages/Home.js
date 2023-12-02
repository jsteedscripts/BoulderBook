import { useEffect } from "react"
import { useSendsContext } from "../hooks/useSendsContext"
import SendDetails from '../components/SendDetails'
import SendForm from "../components/SendForm"

const Home = () => {
    const { sends, dispatch } = useSendsContext()

    // only fires once (when component is first rendered)
    useEffect(() => {
        const fetchSends = async () => {
            const response = await fetch('/api/sends')
            // get array of "send" objects
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_SENDS', payload: json})
            }
        }

        fetchSends()
    }, [dispatch])

    return (
        <div className="home">
            <div className="sends">
                {sends && sends.map(send => (
                    <SendDetails send={send} key={send._id} />
                ))}
            </div>
            <SendForm />
        </div>
    )
}

export default Home