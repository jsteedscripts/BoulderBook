import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserDashboard = () => {
    const { user_id } = useParams()
    const [ dashboardData, setDashboardData ] = useState(null)

    useEffect(() => {
        fetch(`api/users/dashboard/${user_id}`)
            .then(response => response.json())
            .then(data => setDashboardData(data))
            .catch(error => console.error('Error fetch frontend dashboard data', error))
    }, [user_id])

    useEffect(() => {
        if (dashboardData) {
            const ctx = document.getElementById('progressChart').getContext('2d')
            new CharacterData(ctx, {
                type: 'bar',
                data: {

                },
                options: {

                }
            })
        }
    }, [dashboardData])

    return (
        <div>
            <h2>Dashboard</h2>
            <canvas id="progressChart" width="400" height="200"></canvas>
        </div>
    )
}

export default UserDashboard