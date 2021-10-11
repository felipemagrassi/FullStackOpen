import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN_USER':
    return action.payload
  case 'LOGGOUT':
    return action.payload
  default:
    return state
  }
}

export const userAlreadyLogged = (user) => {
  return dispatch => {
    blogService.setToken(user.token)
    dispatch({ type: 'LOGIN_USER', payload: user })
  }
}

export const userLogin = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    const authentication = {
      start: Date.now(),
      end: Date.now() + 60 * 60 * 1000,
    }
    dispatch({ type: 'LOGIN_USER', payload: user })
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    window.localStorage.setItem(
      'authentication',
      JSON.stringify(authentication)
    )
  }
}


export const userLoggout = () => {
  return dispatch => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch({ type: 'LOGGOUT', payload: null })
  }
}

export default userReducer