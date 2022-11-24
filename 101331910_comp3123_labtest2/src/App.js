import {React,useState} from 'react'
import axios from 'axios'

//city.weather ? <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt='weather icon'/> : null

export default function App() {

  const [city,setCity] = useState({})
  const [location,setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=890853977b7c593e72f713f31ab70005`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){

    axios.get(url).then((res) => {
      const result = res.data
      setCity(result)
      console.log(result)
      })
      setLocation('')
    } 
  }

  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]
  let myDate = new Date()

  let D = myDate.getDate()
  let M = myDate.getMonth() + 1
  let Y = myDate.getFullYear()

  let date = `${M}/${D}/${Y}`
  let time = myDate.toLocaleTimeString()

  let Zone = `${days}, ${date}, ${time}`
    
  return (
    <div className="App">
    <div className='search-box'>
        <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} className='search-bar' placeholder='Enter a city' onKeyPress={searchLocation}/>
      </div>
      <div className='weater'>Weather App</div>
      <div className='date'><h1>{Zone}</h1></div>
    <div className='main'>
      <div className='container'>

          <div className='top'>
              <div className='location'>
                <h2>City : {city.name}</h2>
              </div>
              <div className='temp'>
                {city.main ? <h2>Temperature : {city.main.temp.toFixed()} °F</h2>: null}
              </div>
              <div className='description'>
                {city.weather ? <h2>Weather : {city.weather[0].description}</h2>: null}
                {
                  city.name ? <img height={100} width={150} src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt='weather icon'/> : null
                  }
                </div>
          </div>
                
          <div className='bottom'>
              <div className='feels'>
                {city.main ? <h2 className='bold'>Feels Like : {city.main.feels_like.toFixed()} °F</h2> : null}
              </div>
              <div className='humidity'>
              {city.main ? <h2 className='bold'>Humidity : {city.main.humidity} %</h2>: null }
              </div>
              <div className='wind'>
              {city.wind ? <h2 className='bold'>Wind : {city.wind.speed.toFixed()} mph</h2>: null }
              </div>
              <div className='longitude'>
              {city.coord ? <h2 className='bold'>Longitude : {city.coord.lon}</h2>: null }
              </div>
              <div className='latitude'>
              {city.coord ? <h2 className='bold'>Latitude: {city.coord.lat}</h2>: null }
              </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

