import React, { useState, useEffect } from 'react';
import '../css/loginform.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timeout;
    if (showError) {      
      // hide after 5 seconds
      timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showError]);

  const handleCloseError = () => {
    setShowError(false);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${login}:${password}`);

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
      const token = data;
      console.log('JWT:', token);

      localStorage.setItem('jwt', token);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message);
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input 
              type='text' 
              placeholder='Username or Email' 
              required 
              value={login} 
              onChange={(e) => setLogin(e.target.value)}
            />
            <span><FaUser className='icon' /></span>
          </div>
          <div className="input-box">
            <input 
              type='password' 
              placeholder='Password' 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <span><FaLock className='icon' /></span>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>

      <div className={`error-modal-overlay ${showError ? 'show' : ''}`} onClick={handleCloseError}>
        <div className={`error-modal ${showError ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
          <FaExclamationTriangle className="error-icon" />
          <div className="error-message">{errorMessage}</div>
          <button className="error-close-btn" onClick={handleCloseError}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
