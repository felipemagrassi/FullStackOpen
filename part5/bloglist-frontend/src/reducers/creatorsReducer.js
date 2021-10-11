import usersService from '../services/users'

const creatorsReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_CREATORS':
    return action.payload
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_CREATORS',
      payload: users
    })
  }
}

export default creatorsReducer