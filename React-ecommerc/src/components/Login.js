import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/login', {
          username,
          password,
          clientId: "0",
          tracingId: "0",
          errorCode: "a",
          errorDesc: "a",
          token: "1001"
        });

        Cookies.set('sesLoginToken', response.data, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });

        alert('Login successful!');
        onLogin();
        navigate('/');

      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;


