import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Forecast = (props) => {
  const [city, setCity] = React.useState('');
  const [forecastData, setForecastData] = useState([]);

  // const handleChange = (event) => {
  //   event.preventDefault()
  //   setCity(event.target.value)
  //   console.log(city)
  // }
  

const fetchForecastData =  () => {
      const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY
      try {
      setCity(props.cityName)
      console.log(city)
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPI}`, [])
            .then(res =>{
              setForecastData(res.data.list.slice(0, 6)); // Only show the first 3 days of forecast
            })
        
        
      } catch (error) {
        console.log(error);
      }
    };


  useEffect(() => {
      fetchForecastData();

  }, [city]);

  function formatForecastTime (time, temp){
    const dateString = time
    const date = new Date(dateString);
    const timeOptions = { hour: 'numeric' };
    const formatTime = date.toLocaleTimeString(undefined, timeOptions)
    return (
    <div>
      <h4 className='font-bold'>{formatTime}</h4>
      <p>{Math.round(temp)}°F</p>
    </div>
  )}




  return (
    <div className="flex flex-col w-full h-full p-6 bg-blue border border-blue rounded-xl">
    
      <h2 className='flex justify-center font-bold'>Today's Forecast</h2>
      <br/>
      <br/>
      <div className='flex flex-row justify-center'>
        <input 
        className='flex rounded-md w-3/5 h-8 px-4' 
        value={props.cityName}/>
      <button onClick={fetchForecastData} className='flex ml-8'>search</button>
      </div>
      <br/>
      <br/>
      <div className='flex justify-around'>
        {forecastData.map((forecast, index) => (
            <h4 key={index}>{formatForecastTime(forecast.dt_txt, forecast.main.temp, index)}</h4>
          ))}
      </div>
      
    </div>
  );
};

export default Forecast;