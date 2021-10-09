const initialNotificationState = { message: null, seconds: null }
const notificationReducer = (state = initialNotificationState, action) => {
  switch(action.type) {
  case 'SHOW_NOTIFICATION':{
    if(state.seconds) {
      clearTimeout(state.seconds)
    }
    return action.payload
  }
  case 'HIDE_NOTIFICATION':
    return { message: null, seconds: null }
  default:
    return state
  }
}

export const showNotification = ( errorMessage ) => {
  return dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { message: errorMessage, seconds: setTimeout(() => {dispatch({ type: 'HIDE_NOTIFICATION' })}, 5000) }
    })
  }}

export default notificationReducer