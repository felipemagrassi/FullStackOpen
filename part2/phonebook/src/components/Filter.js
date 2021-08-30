const Filter = ( {value, f }) => {
  return (
    <div>
      filter: <input value={value} onChange={f}/>
    </div>
  )
}

export default Filter

