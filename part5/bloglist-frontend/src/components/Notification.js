import React from 'react'
import { Alert } from '@material-ui/core'

const Notification = ( { error, type }) => {
  let divStyle
  if (!error) {
    divStyle = {
      display: 'none'
    }
  }

  const alertStyle = type === 'error' ? 'error' : 'success'

  return (
    <div style={divStyle}>
      <Alert severity={alertStyle}>
        {error}
      </Alert>
    </div>
  )
}

export default Notification