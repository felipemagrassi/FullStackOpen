import anecdotesService from '../services/anecdotes'

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdotesService.likeAnecdote(data)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  } 
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'VOTE':
      const id = action.data.id;
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    default:    
      return state
  }
}

export default anecdotesReducer