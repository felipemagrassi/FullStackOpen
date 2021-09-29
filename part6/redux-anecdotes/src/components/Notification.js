
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => {
    switch (notification.type) {
      case 'vote':
        return `You voted for ${notification.data}`
      case 'create':
        return `created new anecdote with title ${notification.data}`
      case 'hide':
        return null
      default:
        break;
    }
  })
  
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

export default Notification