const Persons = ({filteredPersons}) => {
  const filtered =  filteredPersons.map( (item) => <div> {item.name} {item.number} </div> )
  return (
  <>
  {filtered}
  </> 
  )
}

export default Persons

