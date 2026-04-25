import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Take Test', path: '/test' },
    ];

    const authLinks = isLoggedIn ? [
        { name: 'Dashboard', path: '/dashboard' },
    ] : [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'Admin Panel', path: '/admin' },
    ];

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            OCEAN Predictor
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-slate-700 mx-2"></div>
                        {authLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button 
                                onClick={handleLogout}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg shadow-indigo-500/20"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-slate-300 hover:text-white p-2"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={toggleMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-slate-800 my-2"></div>
                        {authLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={toggleMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                onClick={() => { handleLogout(); toggleMenu(); }}
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-300 hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
