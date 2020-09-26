import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, setFunc}) =>  {
  
  const handleFilterRequestChange = (event) => {
    console.log(event.target.value)
    setFunc(event.target.value)
  }

  return(

  <form>
    <div> filter shown with
      <input 
        value={filter} 
        onChange={handleFilterRequestChange}
      />
    </div>
  </form>
)}

const AddPerson = ({submitFunc, nName, handleName, nNum, handleNum}) => {
  return (
    <form onSubmit={submitFunc}>
        <div> name: 
          <input 
            value={nName}
            onChange={handleName}
          />
        </div>
        <div> number:
          <input 
            value={nNum}
            onChange={handleNum}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const DisplayNames = ({filterFunc, personList}) => {
  
  return (
    <ul>
      {filterFunc(personList)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()

    var allNames = persons.map(n => n.name)
    if (allNames.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  function filterNames(people) {
    if(newFilter !== '') {
      return persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => 
      <li key={person.name}>{person.name + " " + person.number}</li>
      )
    }
    else {
      return persons.map((person) => 
      <li key={person.name}>{person.name + " " + person.number}</li>
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} setFunc={setNewFilter}/>
      
      <h2>add a new</h2>
      <AddPerson submitFunc={addPerson} nName={newName} handleName={handleNameChange} 
      nNum={newNumber} handleNum={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <DisplayNames filterFunc={filterNames} personList={persons}/>
      
    </div>
  )
}

export default App