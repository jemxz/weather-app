import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [search, setsearch] = useState('')
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [humidity, setHumidity] = useState()
  const [temperature, setTemperature] = useState()
  const [wind, setWind] = useState()
  const [weatherIcons, setWeatherIcons] = useState()

    useEffect(() => {
      fetchData()
    },[])

    const fetchData = async(city) => {
        try {
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY
          const res = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
          await setCity(res.data.location.name)
          await setCountry(res.data.location.country)
          await setHumidity(res.data.current.humidity)
          await setTemperature(res.data.current.temperature)
          await setWind(res.data.current.wind_speed)
          await setWeatherIcons(res.data.current.weather_icons)
          console.log(res.data)
        }
        catch {}
    }
  
  const handleSubmit = (event) => {
    console.log(search)
    fetchData(search)
    event.preventDefault()
  };

  const handleChange = event => {
    setsearch(event.target.value);
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text" 
            name="city" 
            placeholder="City Name"
            value={search}
            onChange={handleChange}
            />
          <button for="city">Search</button>
        </form>

        <section>
          <div className="header-div">
            <div>
              <div className="data">
                <img src={weatherIcons} alt="" height='100px' width='100px'/>
                <h1 className="title">
                  {city}
                </h1>
                <h2 className="location">
                  {country}
                </h2>

                <div className="weather-description">
                  <div className="first-child">
                    <h3>HUMIDITY</h3>
                    <p>
                      {humidity}%
                    </p>
                  </div>

                  <div>
                    <h3>TEMPERATURE</h3>
                    <p>
                      {temperature}°C
                    </p>
                  </div>

                  <div className="last-child">
                    <h3>WIND</h3>
                    <p>
                      {wind} kmh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
