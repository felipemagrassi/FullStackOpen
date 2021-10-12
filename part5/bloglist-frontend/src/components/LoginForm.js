import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password,
    })
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <TextField
          id="username"
          label="username"
          variant='standard'
          required
          inputProps={{ minlength: 3 }}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          required
          variant='standard'
          label="password"
          value={password}
          inputProps={{ minlength: 5 }}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id='login-button' type="submit">login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
