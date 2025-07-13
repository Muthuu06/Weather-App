import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [city, setcity] = useState("Hyderabad");
  const [weatherData, setWeatherdata] = useState(null);

  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formatteddate = `${month}${day},${year}`;

  const API_key = "eb059168772862dd250081c9d3226819";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  },[]);

  const handleinputchange = (e) => {
    console.log(e.target.value);
    setcity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getweatherIconUrl=(main)=>
  {
    switch(main){
      case "Clouds":
        return "/cloudy.png";
      case "Rain":
        return "/rainy.png";
      case "Mist":
        return "/mist.png";
      case "Haze":
        return "/haze.png";
        default:
          return null;
    }
  }

  return (
    <div className="App">
      <div className="container">
        {weatherData && weatherData.weather && weatherData.weather.length>0 &&(
          <>
          <h1 className='container_date'>{formatteddate}</h1>
          <div className='weather-data'>
            <h2 className='container_city'>{weatherData.name}</h2>
            <img className='container_img' src={getweatherIconUrl(weatherData.weather[0].main)} width='180px' alt='weather icon'/>
            <h2 className='container_deg'>{(weatherData.main.temp-273.15).toFixed(2) }</h2>
            <h2 className='country_per'>{weatherData.weather[0].description}</h2>
            <form className='form' onSubmit={handleSubmit}>
              <input type='text' placeholder='Enter city name' onChange={handleinputchange}/>
              <button type='submit'>Get</button>
            </form>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
