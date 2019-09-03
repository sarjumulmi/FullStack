import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchCountry = evt => {
    const searchValue = evt.target.value
    setSearchCountry(searchValue)
    
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(resp => resp.data)
      .then(countries => {
        const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
        setCountries(filteredCountries)
      })
  }

  return (
    <div>
      find countries: <input value={searchCountry} onChange={handleSearchCountry} />
      {countries.length > 10 && <p>Too many countries, specify another filter</p>}
      {countries.length <= 10 && countries.length > 1 && 
        countries.map(country => (
          <div key={country.name}>{country.name}</div>
        ))
      }
      {countries.length === 1 && 
        <div>
          <h2>{countries[0].name}</h2>
          <p>Capital {countries[0].capital}</p>
          <p>Population {countries[0].population}</p>
          <h3>Languages</h3>
          {countries[0].languages.map(lang => (
            <div key={lang.name}>{lang.name}</div>
          ))}
          <picture><img src={countries[0].flag} style={{width: '150px',}} /></picture>
        </div>
      }
    </div>
  );
}

export default App;
