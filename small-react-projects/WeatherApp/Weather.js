import React,{useState,useEffect} from 'react'
import "./Weather.css"

const api = {
  key:"ef94443d4bd2bf2f9f5119fa6b33dc55",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  
  const [query,setQuery] = useState('')
  const [weatherData,setWeatherData] = useState({})
  const [background,setBackground] = useState("")
  const [error,setError] = useState("")

  useEffect(() => {
    try{
    fetch(`${api.base}weather?q=Bulgaria&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeatherData(result)
      
    })
    }catch(error){
      console.log(error.message)
    }
  }, [])
  useEffect(() => {
    if(weatherData.weather){
      getBackground(weatherData)
    }
  }, [weatherData])
  const search = evt =>{
    if(evt.key === 'Enter') {
      setError("")
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(function(res) {
          if(!res.ok){
            setError("No results for your search.") 
          }
          return res
      })
        .then(res => res.json())
        .then(result => {
          setWeatherData(result)
          setQuery('')
          
        })
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const getBackground = (weatherData) =>{
    console.log(weatherData)
    if(weatherData.main.temp>16){
      setBackground("app-warm")
    }else{
      setBackground("app-cold")
    }
  }
  return (
 
      <div className={`app ${background}`}>
          {error && <p className="error">{error}</p>}
          <div className="search-box">
            <input 
            className="search-bar"
            type="text" 
            value={query}
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
            />
          </div>

          {(typeof weatherData.main != "undefined") ? 
          <div>
          
              <div className="location-box">
                <div className="location">{weatherData.name},{weatherData.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
        
            <div className="weather-box">
            
              <div className="temp">
              {Math.round(weatherData.main.temp)}°C
              </div>
              <div className="weather">{weatherData.weather[0].main}</div>
            </div>
            
          </div>
          : ""}
        
      </div>

  );
}

export default App;
