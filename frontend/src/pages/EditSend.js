import { useState, useEffect } from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import EditSendForm from "../components/EditSendForm"

const EditSend = () => {
    const { id } = useParams
    const [send, setSend] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSend = async () => {
            try {
                const response = await fetch(`api/sends/edit/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                })
                const json = await response.json()

                if (response.ok) {
                    setSend(json)
                } else {
                    console.log('Error fetching send')
                }
            } catch (error) {
                console.error('Error fetching send:', error)
            }
        }
        fetchSend()
    }, [id, user.token])

    const handleUpdateSend = async (updatedSend) => {
        console.log('Updated send:', updatedSend)
    }

    if (!user) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <h2>Edit Problem</h2>
            <EditSendForm initialSend={send} onSubmit={handleUpdateSend} />
            <Link to="/" className="material-symbols-outlined">
                back
            </Link>
        </div>
    )
}

export default EditSend