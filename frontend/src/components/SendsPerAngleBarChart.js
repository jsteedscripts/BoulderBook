import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';

const SendsPerAngleBarChart = ({ data }) => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        if (data) {
            const angleCounts = {}

            data.forEach((entry) => {
                const angle = entry._id
                angleCounts[angle] = entry.count
            })

            const chartData = {
                labels: Object.keys(angleCounts),
                datasets: [
                    {
                        label: 'Number of Sends Per Angle',
                        data: Object.values(angleCounts),
                        backgroundColor: 'rgba(75,192,192,0.6)'
                    }
                ]
            }
            
            setChartData(chartData)
        }
    }, [data])

    return (
        <div>
            <h2>Number of Sends Per Angle</h2>
            {chartData && <Bar data={chartData} />}
        </div>
    )
}   

export default SendsPerAngleBarChart
