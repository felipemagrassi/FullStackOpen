import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (data) => {
  const object = { content: data, id: getId(), votes: 0 }
  const response = await axios.post(baseURL,object)
  return response.data 
}

const likeAnecdote = async (data) => {
  const object = {...data, votes: data.votes + 1}
  const response = await axios.put(`${baseURL}/${data.id}`, object)
  return response.data
}

export default { getAll, createNew, likeAnecdote }