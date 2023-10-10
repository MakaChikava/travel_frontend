import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Forecast = (props) => {
  const [city, setCity] = React.useState('');
  const [forecastData, setForecastData] = useState([]);

  const handleChange = (event) => {
    event.preventDefault()
    setCity(event.target.value)
    console.log(city)
  }
  

const fetchForecastData = async () => {
      const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY
      
      try {
      setCity(props.cityName)
      console.log(city)
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPI}`);
        setForecastData(response.data.list.slice(3, 8)); // Only show the first 3 days of forecast
      } catch (error) {
        console.log(error);
      }
    };



  useEffect(() => {

      fetchForecastData();


  }, [city]);

  return (
    <div className="flex max-w-xl p-6 bg-blue border border-blue rounded-xl">
        
      {/* <form onSubmit={handleSearch}>
        <label htmlFor="city">City:</label>
        <input id="city" value={props.cityName}/>
        <button type="submit">Search</button>
      </form> */}
      {/* <h1>{props.cityName}</h1> */}
      

      <h2>3-Day Forecast</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (°F)</th>
            <th>Forecast</th>
          </tr>
        </thead>

        <tbody>
          {forecastData.map((forecast, index) => (
            <tr key={index}>
              <td>{forecast.dt_txt}</td>
              <td>{Math.round(forecast.main.temp)}</td>
              <td>{forecast.weather[0].description}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default Forecast;