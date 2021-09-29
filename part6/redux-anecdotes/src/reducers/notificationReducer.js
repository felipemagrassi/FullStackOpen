const notificationReducer = (state = {type: 'hide', data: null  }, action) => { 
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      return {type: 'vote', data: action.data.content}
    case 'CREATE_NOTIFICATION':
      return {type: 'create', data: action.data.content}
    case 'HIDE_NOTIFICATION':
      return {type: 'hide', data: null}
    default:    
      return state
  }
}

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION"
  }
}

export const notifyVote = (content) => {
  return {
    type: "VOTE_NOTIFICATION",
    data: { content }
  }
}

export const notifyCreate = (content) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: { content } 
  }
}

export default notificationReducer
