import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';



function App() {
  const [search, setsearch] = useState('')
  const [allData, setAllData] = useState({
            city: '',
            country: '',
            humidity: '',
            temperature: '',
            minTemp: '',
            weatherIcons: ''
  })

    useEffect(() => {
      fetchData()
    },[])

    const fetchData = async(city) => {
        try {
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
          await setAllData({
            city: res.data.name,
            country: res.data.sys.country,
            humidity: res.data.main.humidity,
            temperature: res.data.main.temp,
            minTemp: res.data.main.temp_min,
            weatherIcons: res.data.weather[0].icon
          })
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

  const handleIcons = () => {
    if(allData.weatherIcons === "") return  <img alt = "" src="https://img.icons8.com/nolan/96/cloud.png"/> 
    return <img alt = "" src={'https://openweathermap.org/img/wn/' + allData.weatherIcons + '@2x.png'} height="100px" width="100px"/>
  }


  return (
    <main>
      <div>
        <form >
          <input
            type="text" 
            name="city" 
            placeholder="City Name"
            value={search}
            onChange={handleChange}
            />
        </form>
          <button className='searchButton' onClick={handleSubmit}for="city">Search</button>

        <section>
          <div className="header-div">
            <div>
              <div className="data">
                {handleIcons}
                <h1 className="title">
                  {allData.city}
                </h1>
                <h2 className="location">
                  {allData.country}
                </h2>

                <div className="weather-description">
                  <div className="first-child">
                    <h3>HUMIDITY</h3>
                    <p>
                    {allData.humidity}%
                    </p>
                  </div>

                  <div>
                    <h3>TEMPERATURE</h3>
                    <p>
                      {allData.temperature}??C
                    </p>
                  </div>

                  <div className="last-child">
                    <h3>MIN TEMPERATURE</h3>
                    <p>
                      {allData.minTemp}??C
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
