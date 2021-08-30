const PersonForm = ( {formFunction, nameFunction, numberFunction, numberValue, nameValue} ) => {
  return (
    <form onSubmit={formFunction}>
    <div>
      name: <input value={nameValue} onChange={nameFunction}/>
    </div>
    <div>number: <input value={numberValue} onChange={numberFunction} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm

