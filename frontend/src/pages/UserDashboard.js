import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import SendsPerAngleBarChart from '../components/SendsPerAngleBarChart'

const UserDashboard = () => {
    const [data, setData] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/user/dashboard/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })

                const json = await response.json()
                if (response.ok) {
                    setData(json.data)
                }
                else {
                    console.log('Error fetching bar chart data 1')
                }
            } catch (error) {
                console.error('Error fetching bar chart data', error)
            }
        }
        fetchData()
    }, [user._id, user.token])

    return (
        <div>
            <h2>Dashboard</h2>
            <SendsPerAngleBarChart data={data} />
        </div>
    )
}

export default UserDashboard