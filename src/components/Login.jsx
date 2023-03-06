import { useState } from "react";
import axios from 'axios';
import swal from '@sweetalert/with-react';

export const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
      event.preventDefault();
      const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!username || !password) {
        setError('Username and password are required.');
        swal({title: error, icon: "error"})
        return;
      }

      if (!username && !regEx.test(username)){
        setError('Email must be a valid format');
        swal({title: error, icon: "error"})
        return;
      }

      if (username !== 'challenge@alkemy.org' || password !== 'REACT'){
        setError('Invalid credentials');
        swal({title: error, icon: "error"})
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
        swal({title: 'Login successful', icon: 'success'})
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
        <button type="submit">Login</button>
      </form>
    );
}