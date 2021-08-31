import Country from './Country'

export default function Countries( {filteredCountries, setName }) {

  if (filteredCountries.length <= 10) {
    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    } else {
      return (
        filteredCountries.map( (country) => (
          <div>
            <span>{country.name}</span>
            <button onClick={() => setName(country.name)}>show</button>
          </div>
        ))
      )
    }
  } else {
    return <p> too many countries </p>
  }
}