import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('access_token'); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">OCEAN Predictor</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Take Test</Link></li>
                
                {isLoggedIn ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/admin">Admin Panel</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;