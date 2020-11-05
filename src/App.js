import React, { useState, useEffect } from 'react'
import axios from 'axios'
import pbService from './services/phonebook'


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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    pbService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    var allNames = persons.map(n => n.name)

    if (allNames.includes(newName)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      var id
      persons.forEach(p => {
        if(p.name == newName) {
          id = p.id
          console.log("triggered");
          console.log('a', p, p.name);
        }
      }) 

      pbService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.name !== newName ? person : response.data))
      })
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    //setPersons(persons.concat(personObject))
    setNewName('')

    setErrorMessage(
      `Added ${personObject.name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    pbService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const DeleteName = ({ name }) => {
    return (
      <form onSubmit={() => handleDeletion(name)}>
        <div>
          <button type="submit">delete</button>
        </div>
      </form>
    )
  }
  

  function handleDeletion(name) {
    var id
    persons.forEach(p => {
      if(p.name == name) {
        id = p.id
        console.log("triggered");
        console.log('a', p, p.name);
      }
    }) 
    pbService
       .del(id)
       .then(response => {
         setPersons(persons.filter(person => person.name !== name))
         .catch(() => console.log("Can’t access " + id + " response. Blocked by browser?"))
     })
  }


  function filterNames(people) {
    if(newFilter !== '') {
      return persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => 
      <li key={person.name}>{person.name + " " + person.number} <DeleteName name={person.name}/> </li>
      )
    }
    else {
      return persons.map((person) => 
      <li key={person.name}>{person.name + " " + person.number} <DeleteName name={person.name}/> </li>
      )
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
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