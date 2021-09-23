import React, { useState } from "react";
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      username: username,
      password: password,
    });
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
