import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '21992872303' 
    }
  ]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( (response) => {
        setPersons(response.data);
      })
  }, [])

  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.findIndex( (person) => person.name === newName ) === -1) {
      setPersons([...persons, {name: newName, number: newNumber}]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const filteredItems = persons.filter( (person) => newFilter === "" ? person : person.name.toUpperCase().includes(newFilter.toUpperCase()));

  const handleFilter = (event) => { setNewFilter(event.target.value)}
  const handleName = (event) => { setNewName(event.target.value)}
  const handleNumber = (event) => { setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} f={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        formFunction={handleSubmit} 
        nameValue={newName} nameFunction={handleName}
        numberValue={newNumber} numberFunction={handleNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredItems}/>
    </div>
  )
}

export default App