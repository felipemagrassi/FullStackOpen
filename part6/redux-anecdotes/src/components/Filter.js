import React from 'react'
import { filterInput } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterInput(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps = dispatch =>  { 
  return {
    filterInput: value => {
      dispatch(filterInput(value))
    }
  }
  }

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter;