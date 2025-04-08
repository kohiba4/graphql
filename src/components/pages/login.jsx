import React, { useState } from 'react';
import '../../loginform.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
// import { useRouter } from 'next/router';

const Login = () => {
  const navigate = useNavigate(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${login}:${password}`); // base64 encode
    // with http basic auth it expects the credentials in the format of "username:password"

    try {
      const res = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Invalid login or password');
      }

      const data = await res.json();
      // console.log('Login response:', data);
      const token = data;
      // console.log('JWT:', token);

      localStorage.setItem('jwt', token); // store JWT
      alert('Login successful!');
      // now you can redirect or show user data

      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input type='text' placeholder='Username or Email' required value={login} onChange={(e) => setLogin(e.target.value)}/>
          <span><FaUser className='icon' /></span>
        </div>
        <div className="input-box">
          <input type='password' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <span><FaLock className='icon' /></span>
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
