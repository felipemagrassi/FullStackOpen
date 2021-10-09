import React from 'react'

const Notification = ( { error }) => {
  return (
    <div className='error'>
      <p>{error}</p>
    </div>
  )
}

export default Notification