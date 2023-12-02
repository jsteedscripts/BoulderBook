import { useEffect, useState } from "react"
import SendDetails from '../components/SendDetails'

const Home = () => {
    // create local state
    const [ sends, setSends ] = useState(null)

    // only fires once (when component is first rendered)
    useEffect(() => {
        const fetchSends = async () => {
            const response = await fetch('/api/sends')
            // get array of "send" objects
            const json = await response.json()

            if (response.ok) {
                setSends(json)
            }
        }

        fetchSends()
    }, [])

    return (
        <div className="home">
            <div className="sends">
                {sends && sends.map((send) => (
                    <SendDetails key={send._id} send={send} />
                ))}
            </div>
        </div>
    )
}

export default Home