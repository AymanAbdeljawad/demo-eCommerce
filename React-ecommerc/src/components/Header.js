import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './Header.css';

const Header = ({ onSearch }) => {
  const username = Cookies.get('username');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    Cookies.remove('sessionToken');
    Cookies.remove('sesLoginToken');
    Cookies.remove('username');
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="header text-white p-1">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-3" to="/">LOGO</NavLink>
          <div className="collapse navbar-collapse d-flex justify-content-between">
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <NavLink className="nav-link btn btn-outline-light me-2 fs-5" to="/">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-outline-light me-2 fs-5" to="/cart">Cart</NavLink>
              </li>
               <li className="nav-item">
                 <NavLink className="nav-link btn btn-outline-light me-2 fs-5" to="/orders">MyOrders</NavLink>
               </li>
            </ul>
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Search by product name"
                className="form-control me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                {username ? (
                  <div className="nav-link fs-5">{username}</div>
                ) : (
                  <NavLink className="nav-link btn btn-outline-light me-2 fs-5" to="/login">Login</NavLink>
                )}
              </li>
              {username && (
                <li className="nav-item">
                  <button className="btn btn-outline-light me-2 fs-5" onClick={handleLogout}>Logout</button>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link btn btn-outline-light fs-5" to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

