import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
const NewUserForm = ({ handleCreateUser }) => {
  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleNewUserSubmit = (event) => {
    event.preventDefault()
    handleCreateUser({
      login,
      name,
      password
    })
  }

  return (
    <form onSubmit={handleNewUserSubmit}>
      <div>
        <TextField
          id="name"
          label="Name"
          variant='standard'
          required
          inputProps={{ minlength: 5 }}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <TextField
          id="login"
          label="Login"
          variant='standard'
          required
          value={login}
          inputProps={{ minlength: 3 }}
          onChange={({ target }) => setLogin(target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          required
          type='password'
          variant='standard'
          label="Password"
          value={password}
          inputProps={{ minlength: 5 }}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id='new_user_button' type="submit">create new user</Button>
    </form>
  )
}

export default NewUserForm
