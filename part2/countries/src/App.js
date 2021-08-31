import React, { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Filter from './components/FilterInput'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')
  
  useEffect( (() => {
    axios
        .get("https://restcountries.eu/rest/v2/all")
        .then( (res) => {
          setCountries(res.data);
        })
  }), [])

  const filteredCountries = countries.filter( (country) => (
    name === "" ? country : country.name.toUpperCase().includes(name.toUpperCase())
  ))

  return (
    <div >
    <Filter name={name} setName={setName}/>
    <Countries filteredCountries={filteredCountries} setName={setName} />
    </div>
  );
}

export default App;
