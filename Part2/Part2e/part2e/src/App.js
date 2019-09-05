import React, {useState, useEffect} from 'react';
import personService from './service'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Button from './Button'
import Notification from './Notification'
import service from './service';

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [number, setNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchPerson, setSearchPerson] = useState({})
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchPersons () {
      const resp = await personService.getAllPersons()
      setPersons(resp)
    }
    fetchPersons()
  }, [])

  const handleNameChange = evt => {
    setNewName(evt.target.value)
  }

  const handleNumberChange = evt => {
    setNumber(evt.target.value)
  }

  const handleSearchChange = evt => {
    const value = evt.target.value
    setSearchName(value)
    console.log('searched name', searchName);
    const searchedPerson  = [...persons].filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
    console.log('searched Person', searchedPerson);
    if (searchedPerson !== undefined) {
      setSearchPerson(searchedPerson)
    } else {
      setSearchPerson({})
    }
  }

  const handleFormSubmit = evt => {
    evt.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    if (personExists && window.confirm(`${newName} already exists, update phonebook with new number?`)) {
      service.updatePerson({name: newName, number: number}, personExists.id)
        .then(updatedPerson => {
          setPersons([...persons.map(p => personExists.id === p.id ? updatedPerson : p )])
          setMessage({text: `${updatedPerson.name}'s number updated in the Phonebook`, type: 'success'})
          setNewName('')
          setNumber('')
          setTimeout(() => {
            console.log('message: ', message);
            setMessage(null)
          }, 5000)
        })
    } else {
      service.createPerson({name: newName, number: number})
        .then(newPerson => {
          setPersons([...persons, newPerson])
          setMessage({text:`${newPerson.name} added to Phonebook`, type: 'success'})
          setNewName('')
          setNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
    }) 
    }
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      console.log(id);
      service.deletePerson(id)
      .then(() => {
        setPersons([...persons.filter(p => p.id !== id)])
        setMessage({text:`${personToDelete.name} deleted.`, type: 'info'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(err => {
        setPersons([...persons.filter(p => p.id !== id)])
        setMessage({text:`${personToDelete.name} doesnot exist in the server.`, type: 'error'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const personsToDisplay = () => {
    if (searchName === '') {
      return (
        persons.map(person => (
          <div key={person.name}>
          {person.name} {person.number}
          <Button text="delete" handleClick={()=>{deletePerson(person.id)}}/>
          </div>
      ))
      )
    } else if (searchPerson.length > 0) {
      console.log('matching person', searchPerson);
      return (
        searchPerson.map(person => (
          <div key={person.name}>
          {person.name} {person.number}
          <Button text="delete" handleClick={()=>{deletePerson(person.id)}}/>
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
      <Notification msg={message} />
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
