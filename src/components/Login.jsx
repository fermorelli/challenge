import { useState } from "react";
import axios from 'axios';

export const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
      event.preventDefault();
      const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      if (!username && !regEx.test(username)){
        setError('Email must be a valid format');
        return;
      }

      if (username !== 'challenge@alkemy.org' || password !== 'react'){
        setError('Invalid credentials');
        return;
      }

      setError(null);

      axios
      .post('http://challenge-react.alkemy.org', {
        username,
        password
      })
      .then(res => {
        console.log(res);
      })

    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    );
}