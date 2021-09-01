const Persons = ({filteredPersons, deleteUser}) => {
  const filtered =  filteredPersons.map( (item) => <li key={item.id}> {item.name} {item.number} <button onClick={() => deleteUser(item.id)}> Delete </button>  </li> )
  return (
  <>
  <ul>
    {filtered}
  </ul>
  </> 
  )
}

export default Persons

