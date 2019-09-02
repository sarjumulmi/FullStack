import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [number, setNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchPerson, setSearchPerson] = useState({})

  useEffect(async () => {
    const resp = await axios.get('http://localhost:3001/persons')
    setPersons(resp.data)
  }, persons)

  const handleNameChange = evt => {
    setNewName(evt.target.value)
  }

  const handleNumberChange = evt => {
    setNumber(evt.target.value)
  }

  const handleSearchChange = evt => {
    setSearchName(evt.target.value)
    console.log('searched name', searchName);
    const searchedPerson  = [...persons].filter(person => person.name.toLowerCase().includes(evt.target.value.toLowerCase()))
    console.log('searched Person', searchedPerson);
    if (searchedPerson !== undefined) {
      setSearchPerson(searchedPerson)
    } else {
      setSearchPerson({})
    }
  }

  const handleFormSubmit = evt => {
    evt.preventDefault()
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, {name: newName, number: number}])
    setNewName('')
    setNumber('')
  }

  const personsToDisplay = () => {
    if (searchName === '') {
      return (
        persons.map(person => (
          <div key={person.name}>
          {person.name} {person.number}
          </div>
      ))
      )
    } else if (searchPerson.length > 0) {
      console.log('matching person', searchPerson);
      return (
        searchPerson.map(person => (
          <div key={person.name}>
          {person.name} {person.number}
          </div>
        )
      ))
    } else {
      console.log('no matching person');
      return (
        <div>No matching person found</div>
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} number={number} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleFormSubmit={handleFormSubmit}/>
      <h2>Numbers</h2>
      <Persons personsToDisplay={personsToDisplay} />
    </div>
  )
}


export default App;
