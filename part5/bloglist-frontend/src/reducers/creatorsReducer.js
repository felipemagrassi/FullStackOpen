import usersService from '../services/users'

const creatorsReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_CREATORS':
    return action.payload
  case 'CREATE_USER':
    return [...state, action.payload]
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

export const createUser = (userObj) => {
  return async dispatch => {
    const { name, login, password } = userObj
    const newUser = await usersService.create({ username: login, name: name, password: password })
    dispatch({
      type: 'CREATE_USER',
      payload: newUser
    })
  }

}

export default creatorsReducer