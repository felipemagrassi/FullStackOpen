const notificationReducer = (state = {type: 'hide', data: {content: null, seconds: null}}, action) => {
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      if(state.data.seconds) clearTimeout(state.data.seconds)
      return {type: 'vote', data: {...action.data}}
    case 'CREATE_NOTIFICATION':
      if(state.data.seconds) clearTimeout(state.data.seconds)
      return {type: 'create', data: {...action.data}}
    case 'HIDE_NOTIFICATION':
      return {type: 'hide', data: {content: null, seconds: null}}
    default:
      return state
  }
}

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION"
  }
}

export const notifyVote = (content, seconds) => {
  return dispatch => {
    dispatch({
      type: 'VOTE_NOTIFICATION',
      data: { content, seconds: setTimeout(() => {dispatch({type: "HIDE_NOTIFICATION"})}, seconds) } 
    })
  }}

export const notifyCreate = (content, seconds) => {
  return dispatch => {
  dispatch({
    type: 'CREATE_NOTIFICATION',
    data: { content, seconds: setTimeout(() => {dispatch({type: "HIDE_NOTIFICATION"})}, seconds) } 
  })
  setTimeout(() => {
    dispatch({type: "HIDE_NOTIFICATION"})
  }, seconds)
}}

export default notificationReducer
