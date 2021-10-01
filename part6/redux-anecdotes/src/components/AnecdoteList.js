import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, inputFilter}) => anecdotes.filter((anecdote => anecdote.content.includes(inputFilter))))

  const vote = (e, anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notifyVote(anecdote.content , 5000))
  }

  return (
    <div>
      <Notification/>
      {anecdotes
      .sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={(e) => vote(e,anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList