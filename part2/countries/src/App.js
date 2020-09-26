import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = ({data, filter}) => {
  const [ displayedC, setDisplayedC ] = useState([])

  var filteredNames = data.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredNames.length > 10) return <ul></ul>
  if (filteredNames.length == 1) {
    var country = filteredNames[0]
    return <DisplayFullCountry country={country}/>
  }


    var retval = (
      <ul>
        {filteredNames
          .map(c => 
            <li key={c.name}> {c.name} 
              <button onClick={() => setDisplayedC(displayedC.concat(c.name))}>
                show
              </button>
            </li> 
          )
        }
      </ul>
    )

    data.forEach( c => {
      if (displayedC.includes(c.name)) {
        retval = <> {retval} <DisplayFullCountry country={c}/> </>
      }
    })

    return retval
}


const DisplayFullCountry = ({country}) => {
  var languages = country.languages
  const api_key = process.env.REACT_APP_API_KEY
  var apiResponse

  const axios = require('axios');
  const params = {
    access_key: api_key,
    query: country.capital
  }


  return (
    <>
    <h1>{country.name}</h1>
    capital {country.capital} <br></br>
    population {country.population}

    <h2>Spoken languages</h2>

    <ul>
      {languages.map(l => <li key={l.name}>{l.name}</li>)}
    </ul>

    <img src={country.flag} width="200" height="200" />

    
    <h2>Weather in {country.capital}</h2>
    </>
  )
}

function App() {

  const [ filter, setFilter ] = useState('')
  const [ data, setData ] = useState([])


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setData(response.data)
        //setPersons(response.data)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">

        <form>
          <div> find countries 
            <input 
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
          filter: {filter}
        </form>
        <DisplayCountries data={data} filter={filter}/>
      </header>
    </div>
  );
}

export default App;
