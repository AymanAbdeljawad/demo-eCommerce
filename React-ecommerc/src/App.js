import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Header from './components/Header';
import Orders from './components/Order';
import Login from './components/Login';
import Register from './components/Register';
import Cookies from 'js-cookie';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('sessionToken'));

  useEffect(() => {
    const handleCookieChange = () => {
      setIsAuthenticated(!!Cookies.get('sessionToken'));
    };

    document.addEventListener('cookiechange', handleCookieChange);

    return () => {
      document.removeEventListener('cookiechange', handleCookieChange);
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
export default App;
