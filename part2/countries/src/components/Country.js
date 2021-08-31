import React, {useState, useEffect} from 'react'; 
import axios from 'axios';

export default function Country ({ country }) { 
  const [weather, setWeather] = useState([])

  useEffect( (() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then( (res) => {
        setWeather(res.data);
      })
  }), [])

  if (weather.length !== 0) {
    return (
  <div>
        <h2> {country.name} </h2> 
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3> languages </h3>
        <ul>
          {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li> )}
        </ul>
        <h3>Weather in {country.capital} </h3>
        <p>temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
        <p>wind: {weather.current.wind_speed}</p>
      </div>
  )} else {
    return (
      <div>
        <h2> {country.name} </h2> 
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3> languages </h3>
        <ul>
          {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li> )}
        </ul>
      </div>
    )
  }
}