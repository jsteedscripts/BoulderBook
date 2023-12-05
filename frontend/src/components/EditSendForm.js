import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useSendsContext } from '../hooks/useSendsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EditSendForm = () => {
    const { sends, dispatch } = useSendsContext()
    const { id } = useParams()
    const { user } = useAuthContext()
 
    const [sendData, setSendData] = useState({
        grade: '',
        attempts: 1,
        angle: '',
        flash: '',
        holds: null,
        moves: null,
        gym: ''
    });
    
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    

    useEffect(() => {
        const selectedSend = sends.find((send) => send._id === id)

        if (selectedSend) {
            setSendData({
                grade: selectedSend.grade,
                attempts: selectedSend.attempts,
                angle: selectedSend.angle,
                flash: selectedSend.flash,
                holds: selectedSend.holds,
                moves: selectedSend.moves,
                gym: selectedSend.gym
            });
        }
    }, [sends, id])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in to view')
            setEmptyFields([])
            return
        }

        const response = await fetch(`/api/sends/edit/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            const updatedSend = await response.json()
            setError(null)
            dispatch({type: 'EDIT_SEND', payload: updatedSend})
            Navigate('/')
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Check if the field is a multi-select (holds and moves)
        const isArrayField = ['holds', 'moves'].includes(name);
      
        setSendData((prevData) => ({
          ...prevData,
          [name]: isArrayField ? Array.from(e.target.selectedOptions, (option) => option.value) : value,
        }));
      };
      

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Edit Problem</h3>
            <label>Problem Grade (V Scale):</label>
            <select
                name="grade"
                onChange={handleInputChange}
                value={sendData.grade}
                className={`styled-dropdown ${emptyFields.includes('grade') ? 'error' : ''}`}
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
                onChange={handleInputChange} 
                value={sendData.attempts}
            />

            <label>Wall angle (Enter a number from 0 to 180):</label>
            <input 
                type="number" 
                onChange={handleInputChange} 
                value={sendData.angle}
                className={emptyFields.includes('angle') ? 'error' : ''}
            />

            <label>Flash:</label>
            <select
                onChange={handleInputChange}
                value={sendData.flash}
                className={`styled-dropdown ${emptyFields.includes('flash') ? 'error' : ''}`}
            >
                <option value="" disabled>Select Flash</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label>Hold types:</label>
            <select
                multiple
                onChange={handleInputChange}
                value={sendData.holds}
                className={`styled-dropdown ${emptyFields.includes('holds') ? 'error' : ''}`}
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
                onChange={handleInputChange}
                value={sendData.moves}
                className={`styled-dropdown ${emptyFields.includes('moves') ? 'error' : ''}`}
            >
                {["smear", "drop knee", "knee bar", "toe hook", "heel hook", "gaston", "dyno", "flag", "back flag", "bicycle", "mantle", "deadpoint"].map((moveType) => (
                    <option key={moveType} value={moveType}>
                        {moveType}
                    </option>
                ))}
            </select>

            <label>Gym:</label>
            <input 
                type="gym" 
                onChange={handleInputChange} 
                value={sendData.gym}
                className={emptyFields.includes('gym') ? 'error' : ''}
            />

            <button>Update Problem</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EditSendForm