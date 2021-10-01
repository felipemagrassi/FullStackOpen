
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    let notification
    switch (props.notification.type) {
      case 'vote':
        notification = `You voted for ${props.notification.data.content}`
        break;
      case 'create':
        notification = `created new anecdote with title ${props.notification.data.content}`
        break;
      case 'hide':
        notification = null
        break;
      default:
        break;
    }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) {
    return <div>{notification}</div>
  }
  return (
  <div style={style}>
    {notification}
  </div>
  )

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
