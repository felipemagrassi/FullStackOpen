import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ returnMessage, setReturnMessage] = useState('')
  const [ returnMessageClass, setReturnMessageClass] = useState("")

  useEffect(() => {
    personService
    .getAll()
    .then(person => setPersons(person))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.findIndex( (person) => person.name === newName ) === -1) {
      if(newName !== "" && newNumber  !== "") {
      const personObject = {name: newName, number: newNumber}
      
      personService
        .create(personObject)
        .then(response => {
          setPersons([...persons, response])  
        })
      setReturnMessageClass("sucess")
      setReturnMessage(` ${newName} added to the phonebook`)
      setTimeout(() => {
        setReturnMessage(null)
      }, 5000)
    }} else {
      updatePhone();
    }
  }

  const updatePhone = () => {
    const person = persons.find((person) => person.name === newName)
    const id = person.id

    if (newNumber !== "" && window.confirm(`${person.name} already exists, do you want to update the number?`)) {
      const updatedPerson = {...person, number:newNumber}
      
      personService
        .updatePhone(id, updatedPerson)
        .then((person) => setPersons(persons.map(n => n.id !== id ? n : person)))
        setReturnMessageClass("sucess")
        setReturnMessage(`${newName} phone updated!`)
        setTimeout(() => {
        setReturnMessage(null)
      }, 5000)
      }
    }

  const deleteUser = (id) => {
    const person = persons.find(n => n.id === id);
    
    if (window.confirm(`Delete ${person.name}`)) {
    
    personService
      .deleteUser(id, person)
      .then((person) => setPersons(persons.filter(n => n.id !== id)))
      .catch((error) => {
        setReturnMessage(`${person.name} was already removed from server`)
        setReturnMessageClass("error")
          setTimeout(() => {
            setReturnMessage(null)
          }, 5000)
      }) 
    }
  }
  const filteredItems = persons.filter( (person) => newFilter === "" ? person : person.name.toUpperCase().includes(newFilter.toUpperCase()));

  const handleFilter = (event) => { setNewFilter(event.target.value)}
  const handleName = (event) => { setNewName(event.target.value)}
  const handleNumber = (event) => { setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={returnMessage} messageClass={returnMessageClass}/>

      <Filter value={newFilter} f={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        formFunction={handleSubmit} 
        nameValue={newName} nameFunction={handleName}
        numberValue={newNumber} numberFunction={handleNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredItems} deleteUser={deleteUser}/>
    </div>
  )
}

export default App
