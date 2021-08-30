import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '21992872303' 
    }
  ]) 
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

  const filteredItems = persons.filter( (person) => newFilter === "" ? person : person.name.includes(newFilter));

  const handleFilter = (event) => { setNewFilter(event.target.value)}
  const handleName = (event) => { setNewName(event.target.value)}
  const handleNumber = (event) => { setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilter} />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredItems.map( (item) => <div> {item.name} {item.number} </div>)}
    </div>
  )
}

export default App