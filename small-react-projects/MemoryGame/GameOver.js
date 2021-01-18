import React from 'react'
import { Link } from 'react-router-dom'
import { useBoard } from './BoardContext'

function GameOver() {
    const {endTime} = useBoard()
    return (
        <div className="end-game-container">
            <div className="end-game">
                <div className="end-game-time">
                    <p>You guessed the cards in <span>{endTime}</span> minutes</p>
                    
                </div>
                <Link className="play-again-btn btn-board" to="/">Play Again</Link>
            </div>
        </div>
    )
}

export default GameOver
