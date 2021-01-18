import React,{useContext,useState,useEffect,useRef} from 'react'
import { useHistory } from 'react-router-dom'

const BoardContext = React.createContext()

export function useBoard() {
    return useContext(BoardContext)
}
export function BoardContextProvider({children}) {

    const [chosenCards,setChosenCards] = useState([])
    const [guessedCards,setGuessedCards] = useState(0)
    const [timer,setTimer] = useState(0)
    const [endTime,setEndTime] = useState(0)
    const [loading,setLoading] = useState(false)
    const [isTimeRunning,setIsTimeRunning] = useState(false)
    const increment = useRef(null)
    const history = useHistory()
    useEffect(() => {    

        if(chosenCards.length===2){
            setLoading(true)
          
            if(chosenCards[0].cardName===chosenCards[1].cardName){
                setGuessedCards(guessedCards+2) 
                console.log("increment")
                setChosenCards('')
            }else{
               
                setTimeout(()=>{
                    chosenCards.forEach(card=>{
                       
                        document.getElementById(card.id).classList.remove('rotation')
                    })
                    setLoading(false)
                    setChosenCards('')
                },800)
                 
                    
            }
        
        }
    }, [chosenCards,guessedCards])

    useEffect(() => {
        setChosenCards('') 
        setLoading(false)
        console.log(guessedCards)
        if(guessedCards===12){
            setIsTimeRunning(false)
            clearInterval(increment.current)
            setEndTime(formatTime())
            setTimeout(()=>{
                history.push("/end")
            },700)
            
        }
    }, [guessedCards])

    function startTimer(){
        setGuessedCards(0)
        setIsTimeRunning(true)
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
          }, 1000)
    }
    
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
    
          return `${getMinutes}:${getSeconds}`
      }

    const value = {
        chosenCards,
        setChosenCards,
        timer,
        setTimer,
        startTimer,
        formatTime,
        endTime,
        loading,
        setLoading,
        isTimeRunning
    }
    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    )
}
