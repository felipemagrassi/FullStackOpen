import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreate } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const createAnecdote = async (event) => {
    event.preventDefault();
    props.newAnecdote(event.target.anecdote.value)
    props.notifyCreate(event.target.anecdote.value,5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = 
  {
    newAnecdote,
    notifyCreate
  }

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm;