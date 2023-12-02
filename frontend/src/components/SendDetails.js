const SendDetails = ({ send }) => {
    return (
        <div className="send-details">
            <h4>Grade: V{send.grade}</h4>
            <p><strong>Attempts: {send.attempts}</strong></p>
            <p><strong>Wall Angle: {send.angle}</strong></p>
            <p><strong>Flash: {send.flash.toString()}</strong></p>
            <p><strong>Hold Types: {send.holds.join(', ')}</strong></p>
            <p><strong>Moves: {send.moves.join(', ')}</strong></p>
            <p>{send.createdAt}</p>
        </div>
    )
}

export default SendDetails