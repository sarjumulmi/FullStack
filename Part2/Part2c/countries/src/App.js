import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [showCountry, setShowCountry] = useState(false)
  const [countryDetail, setCountryDetail] = useState({})
  const [weatherDetail, setWeatherDetail] = useState({})

  const handleSearchCountry = evt => {
    const searchValue = evt.target.value
    setSearchCountry(searchValue)
    setShowCountry(false)
    setCountryDetail({})
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(resp => resp.data)
      .then(countries => {
        const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
        setCountries(filteredCountries)
      })
  }

  useEffect(() => {
    if (countries.length === 1) {
      const getWeatherDetail = async (location) => {
        const resp =   await axios.get(`http://api.apixu.com/v1/current.json?key=fea88c71ab3f49d9b42135103190309&q=${location}`)
        setWeatherDetail(resp.data.current)
      }
      getWeatherDetail(countries[0].capital)
    }
  }, [countries.map(c => c.name).join(',')])

  const showCountryDetail = (country) => {
    setShowCountry(true)
    setCountryDetail(country)
  }

  return (
    <div>
      find countries: <input value={searchCountry} onChange={handleSearchCountry} />
      {countries.length > 10 && <p>Too many countries, specify another filter</p>}
      {countries.length <= 10 && countries.length > 1 && 
        countries.map(country => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => showCountryDetail(country)}>show</button>
          </div>
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
          <h2>Weather in {countries[0].capital}</h2>
          <p><strong>temperature: {weatherDetail.temp_c} Celcius</strong> </p>
          {weatherDetail.condition && <picture><img src={'https:'+ weatherDetail.condition.icon} style={{width: '100px',}}/></picture>}
          <p><strong>wind: {weatherDetail.wind_kph} direction {weatherDetail.wind_dir}</strong> </p>
        </div>
      }
      {showCountry && 
        <div>
          <h2>{countryDetail.name}</h2>
          <p>Capital {countryDetail.capital}</p>
          <p>Population {countryDetail.population}</p>
          <h3>Languages</h3>
          {countryDetail.languages.map(lang => (
            <div key={lang.name}>{lang.name}</div>
          ))}
          <picture><img src={countryDetail.flag} style={{width: '150px',}} /></picture>
        </div>}
    </div>
  );
}

export default App;
