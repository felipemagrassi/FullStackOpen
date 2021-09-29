import React from 'react'
import { useDispatch } from 'react-redux'
import anecdotesService from '../services/anecdotes'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notifyCreate, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault();
    dispatch(newAnecdote(event.target.anecdote.value))
    dispatch(notifyCreate(event.target.anecdote.value,5000))
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


export default AnecdoteForm;