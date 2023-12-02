import { useState } from 'react'
import { useSendsContext } from '../hooks/useSendsContext'

const SendForm = () => {
    const { dispatch } = useSendsContext()

    const [grade, setGrade] = useState('')
    const [attempts, setAttempts] = useState('')
    const [angle, setAngle] = useState('')
    const [flash, setFlash] = useState('')
    const [holds, setHolds] = useState([])
    const [moves, setMoves] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const send = { grade, attempts, angle, flash, holds, moves }

        const response = await fetch('/api/sends', {
            method: 'POST',
            body: JSON.stringify(send),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            setGrade('')
            setAttempts('')
            setAngle('')
            setFlash('')
            setHolds([])
            setMoves([])
            dispatch({type: 'CREATE_SEND', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Log a New Send</h3>
            <label>Send Grade (V Scale):</label>
            <select
                onChange={(e) => setGrade(e.target.value)}
                value={grade}
                className="styled-dropdown"
            >
                <option value="" disabled>Select Grade</option>
                {[...Array(18).keys()].map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <label>Number of attempts:</label>
            <input 
                type="number" 
                onChange={(e) => setAttempts(e.target.value)} 
                value={attempts}
            />

            <label>Wall angle (Enter a number from 0 to 180):</label>
            <input 
                type="number" 
                onChange={(e) => setAngle(e.target.value)} 
                value={angle}
            />

            <label>Flash:</label>
            <select
                onChange={(e) => setFlash(e.target.value)}
                value={flash}
                className="styled-dropdown"
            >
                <option value="" disabled>Select Flash</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label>Hold types:</label>
            <select
                multiple
                onChange={(e) => setHolds(Array.from(e.target.selectedOptions, (option) => option.value))}
                value={holds}
                className="styled-dropdown"
            >
                {["slopers", "pinches", "crimps", "jugs", "pockets", "underclings", "sidepulls"].map((holdType) => (
                    <option key={holdType} value={holdType}>
                        {holdType}
                    </option>
                ))}
            </select>

            <label>Moves:</label>
            <select
                multiple
                onChange={(e) => setMoves(Array.from(e.target.selectedOptions, (option) => option.value))}
                value={moves}
                className="styled-dropdown"
            >
                {["smear", "drop knee", "knee bar", "toe hook", "heel hook", "gaston", "dyno", "flag", "back flag", "bicycle", "mantle", "deadpoint"].map((moveType) => (
                    <option key={moveType} value={moveType}>
                        {moveType}
                    </option>
                ))}
            </select>

            <button>Add Send</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SendForm