import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cloudy from '/Users/maka/personal_projects/travel_frontend/src/icons/cloudy.png'
import rain from '/Users/maka/personal_projects/travel_frontend/src/icons/rain.png'
import sunny from '/Users/maka/personal_projects/travel_frontend/src/icons/sunny.png'
import Wind from '/Users/maka/personal_projects/travel_frontend/src/icons/wind.png'
import PackingList from './components/PackingList';
import Forecast from './components/Forecast';
import CreateList from './components/createList';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState({
    city: '',
    state: '',
    temperature: {
      current: 0,
      high: 0,
      low: 0
    },
    humidity: 0,
    wind: {
      speed: 0,
      direction: 0
    },
    forecast: ''
  });
const [cityName, setCityName] = React.useState('');

  const handleSearch = () =>{
    const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${weatherAPI}`)
    .then(response => {
      const data = response.data;
      setWeatherData({
        city: data.name,
        state: data.sys.country,
        temperature: {
          current: Math.round(data.main.temp),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min)
        },
        humidity: data.main.humidity,
        wind: {
          speed: Math.round(data.wind.speed),
          direction: data.wind.deg
        },
        forecast: data.weather[0].description
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  
  

  useEffect(() => {
    
    handleSearch()
  }, [cityName]);

  function getWeatherImg(temperature, humidity, wind, forecast){
    if (temperature.current < 50) {
      return <img id='icon' src={cloudy}/>
    } else if (temperature.current < 30) {
      return <img src={cloudy} id='icon'/>
    } else if (forecast.includes('rain')) {
      return <img src={rain} id='icon'/>
    } else if (temperature.current > 80 && humidity > 60) {
      return <img src={sunny} id='icon'/>
    } else if (wind.speed > 15) {
      return <img src={Wind} id='icon'/>
    } else if (temperature.current > 90) {
      return <img src={sunny} id='icon'/>
    } else if (temperature.current > 75 && forecast.includes('thunderstorms')) {
      return <img src={rain} id='icon'/>
    } else {
      return <img src={sunny} id='icon'/>
    }
  }

  function getWeatherMessage(city, temperature, humidity, wind, forecast) {
    if (temperature.current < 50) {
      return `Looks like it's chilly in ${city} today! Don't forget to bring a jacket.`;
    } else if (temperature.current < 30) {
      return `Brrr! It's freezing in ${city}! Bring a heavy coat today.`;
    } else if (forecast.includes('rain')) {
      return `Looks like it might rain in ${city} today. Don't forget your umbrella!`;
    } else if (temperature.current > 80 && humidity > 60) {
      return `It's hot and humid in ${city} today! Stay hydrated and wear breathable clothing.`;
    } else if (wind.speed > 15) {
      return `Looks like it's windy in ${city} today! Hold onto your hats.`;
    } else if (temperature.current > 90) {
      return `Wow, it's scorching in ${city} today! Stay indoors or seek shade if possible.`;
    } else if (temperature.current > 75 && forecast.includes('thunderstorms')) {
      return `Be careful if you're out and about in ${city} today - there's a chance of thunderstorms.`;
    } else {
      return `Looks like a beautiful day in ${city}! Pack light and enjoy the sunshine.`;
    }
}
  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };


  return (
<>
  <div className="flex justify-center">
    <h1 className='flex text-lg font-bold'>CliMate Change</h1>
  </div>

  <div className='flex flex-row justify-around'>

  <div className='flex'>
    {/* <button onClick={toggleList}>{showList ? 'Hide Packing List Suggestions' : 'Show Packing List Suggestions'}</button> */}
        { <PackingList/>}
  </div>



  <div className='flex flex-col'>
    <div className='flex justify-center h-96'>
    <div className="flex flex-col max-w-xl p-6 bg-azul border border-blue rounded-xl">

    
<div className='flex justify-center'>
  <input 
    type="text"
    value={cityName}
    onChange={handleCityChange}
    placeholder='Search for cities'
    className='rounded-md w-3/5 h-8 flex justify-center'
    />
</div>
    


<div className='flex h-full'>
  <div className='flex flex-col w-full'>
    <h1 className='flex text-2xl italic '>{weatherData.city}, {weatherData.state}</h1>
    <p className='flex'>{weatherData.forecast}</p>
    <p className='flex h-full items-center text-4xl font-bold'>{weatherData.temperature.current}°F/{Math.round((weatherData.temperature.current - 32) * 5/9)}°C</p>
  </div>
  
  
  <div className='flex justify-center flex-wrap'>
    {getWeatherImg(weatherData.temperature, weatherData.humidity, weatherData.wind, weatherData.forecast)}
    <p>{getWeatherMessage(weatherData.city, weatherData.temperature, weatherData.humidity, weatherData.wind, weatherData.forecast)}</p>
  </div>
</div>

<div className='flex justify-around items-end'>
  <div className='flex flex-col h-fit'>
  <h4 className='font-bold'>Humidity</h4>
  <p>{weatherData.humidity}%</p>
  </div>
  <div className='flex flex-col h-fit'>
    <h4 className='font-bold'>Wind speed</h4>
    <p>{weatherData.wind.speed} mph</p>
  </div>
  
  
</div>
</div>
    </div>


  <br/>



    <div className='flex justify-center h-full'>
      <Forecast cityName={cityName}/>
    </div>
  </div>

  <div className='flex'>
    <CreateList />
  </div>

    </div>
</>
  );
};

export default App;