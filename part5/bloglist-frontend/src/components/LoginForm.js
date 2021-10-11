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
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          required
          label="password"
          value={password}
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
