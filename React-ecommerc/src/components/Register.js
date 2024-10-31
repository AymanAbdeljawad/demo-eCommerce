import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username && email && password && password === confirmPassword) {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/register', {
          username,
          email,
          password,
          clientId: "0",
          tracingId: "0",
          errorCode: "a",
          errorDesc: "a",
          token: "1001",
          roles: ["ROLE", "USER"]
        });

        alert('Registration successful! You can now log in.');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter valid credentials and ensure passwords match.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'} {}
      </button>
    </div>
  );
};

export default Register;
