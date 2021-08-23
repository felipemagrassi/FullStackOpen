import React, { useState } from 'react'
import Button from './Components/Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))

  const handleAnecdote = () => {
    let random = Math.round((Math.random() * 10) % 6)
    while (random === selected) {
      random = Math.round((Math.random() * 10) % 6)
    }
    setSelected(random); 
  }

  const handleVote = () => {
    const copy = [...votes];
    copy[selected]++
    setVotes(copy)
  }
  
  return (
    <div>
      <h2> Anecdote of the day </h2>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <Button handler={handleVote} text="Vote" />
      <Button handler={handleAnecdote} text="Next"/>

      <h2>Anecdote with most votes</h2>
      <p> {anecdotes[votes.indexOf(Math.max(...votes))]} 
      <p> {Math.max(...votes)}</p>
      </p>
      
    </div>
  )
}

export default App