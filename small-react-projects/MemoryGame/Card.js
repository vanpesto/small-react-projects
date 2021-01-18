import React,{useState,useEffect} from 'react'
import { useBoard } from './BoardContext'


function Card(props) {
    const { chosenCards,setChosenCards,isTimeRunning} = useBoard()
    const [disabled,setDisabled] = useState(false)

    useEffect(() => {
        if(document.getElementById(props.card.id).classList.contains("rotation")){
        
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }, [chosenCards])
  
    return (
        
        <button disabled={disabled} className="card" style={!isTimeRunning ? {pointerEvents:"none" } : {}} onClick={chosenCards.length < 2 ? (e)=>{
        
            e.target.firstChild.classList.add('rotation')
            setChosenCards([...chosenCards,props.card])
            
            }:(e)=>e.target.style.pointerEvets="none"}>
              
        <div className="card-inner" id={props.card.id} >
            <div className="card-back">
            <img draggable="false" src="images/memoryGame/card-back.png" alt="card-back"/>
             
            </div>
            <div className="card-front">
            <img draggable="false" src={props.card.image} alt="animal"/>
            </div>
        </div>
        </button>
    )
}

export default Card
