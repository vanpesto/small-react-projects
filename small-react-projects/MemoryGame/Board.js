import React,{useState,useEffect} from 'react'
import './Board.css';
import { useBoard } from './BoardContext';
import Card from './Card';
import {data} from './data'


function Board() {

  const [cards,setCards] = useState(data)
  const [shuffled,setShuffled] = useState(false)
  const {setTimer,startTimer,formatTime} = useBoard()


  useEffect(() => {
   shuffleCards()
    setTimer(0)
  }, [])

  useEffect(() => {
    setShuffled(true)
  }, [cards])

  const shuffleCards = ()=>{
    const newCards = cards
    for(let i = newCards.length - 1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      const temp = newCards[i]
      newCards[i] = newCards[j]
      newCards[j] = temp
    }
    setCards(newCards)
  }
  return (
    <main className="board-main">
       
      <div className="board">
        {shuffled && cards.map((item,index)=>{
          return <Card key={index} card={item}/>
        })}
        
      </div>
      <div className="board-timer-container">
        <p className="board-timer">{formatTime()}</p>
        <button className="play-again-btn btn-board" onClick={(e)=>{
          startTimer()
          e.target.style.display="none"
        }}>Start</button>
      </div>
    </main>
  );
}

export default Board;
