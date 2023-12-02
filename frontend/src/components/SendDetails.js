import { useSendsContext } from '../hooks/useSendsContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const SendDetails = ({ send }) => {
    const { dispatch } = useSendsContext()

    const handleClick = async () => {
        const response = await fetch('/api/sends/' + send._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_SEND', payload: json})
        }
    }

    return (
        <div className="send-details">
            <h4>Grade: V{send.grade}</h4>
            <p><strong>Attempts: {send.attempts}</strong></p>
            <p><strong>Wall Angle: {send.angle}</strong></p>
            <p><strong>Flash: {send.flash.toString()}</strong></p>
            <p><strong>Hold Types: {send.holds.join(', ')}</strong></p>
            <p><strong>Moves: {send.moves.join(', ')}</strong></p>
            <p>{formatDistanceToNow(new Date(send.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default SendDetails