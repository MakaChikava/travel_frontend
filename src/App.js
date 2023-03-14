import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const App = () => {
  const [listArray, setListArray] = useState(
    {
      category:"",
      top:[""], 
      bottoms:[""],
      shoes:[""],
      headgear: [""],
      accessories: [""]
    }
  );

  const [list, setList] = useState([])

  //Get packed items database 
  const allPackingItems = () => {
    axios.get('http://localhost:3000/location').then(response => {
      setListArray(response.data)
      console.log(response.data)
    });
  };


  //Delete
  const deleteItem = (listArray) => {
    axios.delete(`http://localhost:3000/location/${listArray._id}`).then(()=> {
      axios.get('http://localhost:3000/location').then((response) => {
        setList(response.data)
      })
    })
  };

  useEffect(()=> {
    allPackingItems();
  },[])

  //Update



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

  return (
    <div>
      {/* <h1>{weatherData.city}, {weatherData.state}</h1> */}
      {/* <p>Current Temperature: {weatherData.temperature.current}°F</p> */}
      {/* <p>High: {weatherData.temperature.high}°F</p> */}
      {/* <p>Low: {weatherData.temperature.low}°F</p> */}
      {/* <p>Humidity: {weatherData.humidity}%</p> */}
      {/* <p>Wind Speed: {weatherData.wind.speed} mph {weatherData.wind.direction}</p> */}
      <button onClick={allPackingItems}>Get Packing Items</button>
      <ul>
      {listArray.map((list) => {
        return (
          <div>
            <li>{list.category}</li>
          </div>
        )
      })}
      </ul>
    </div>
  );
}

export default App;