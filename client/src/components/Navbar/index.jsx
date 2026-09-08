import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="gradient-bg text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold flex items-center space-x-2">
            <span className="text-2xl">📄</span>
            <span>AI Resume Builder</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
                <Link to="/register" className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
