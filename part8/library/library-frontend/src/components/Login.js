import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      localStorage.setItem('user-token', token);
      setToken(token);
      setUsername('');
      setPassword('');
    }
  }, [data, setToken]);

  if (!show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    login({
      variables: { username, password },
    });
    setPage('authors');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};
export default Login;
