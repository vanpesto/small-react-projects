import React, {useState,useEffect} from 'react'
import Loading from '../../Loading'
import Tours from './Tours'
import Axios from 'axios'
import '../../App.css'
const url = 'https://course-api.com/react-tours-project'

function MainTours() {

  const [loading,setLoading] = useState(true)
  const [tours,setTours] = useState([])

  const fetchTours = ()=> {
    setLoading(true)
    Axios.get(url).then(res=>{
      setTours(res.data)
      setLoading(false)
    })
  }
  useEffect(() =>{
    fetchTours()
  },[])

  const removeTour = id =>{
    const newTours = tours.filter((tour)=>tour.id !== id)
    setTours(newTours)
  }

  if(tours.length===0){
    return(
      <div className="no-tours">
        <h3 className="tours-title">No Tours Left</h3>
        <button className="btn-tours" onClick={fetchTours}>Refresh</button>
      </div>
    ) 
  }

  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    )
  }

  return (
    <main className="main-tours">
        <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default MainTours;
