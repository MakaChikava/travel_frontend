import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Forecast = () => {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPI}`);
        setForecastData(response.data.list.slice(0, 3)); // Only show the first 3 days of forecast
      } catch (error) {
        console.log(error);
      }
    };

    if (city) {
      fetchForecastData();
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div className="flex max-w-xl p-6 bg-blue border border-blue rounded-xl">
        
      <form onSubmit={handleSearch}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" />
        <button type="submit">Search</button>
      </form>

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