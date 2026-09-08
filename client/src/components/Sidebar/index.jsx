import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/create-resume', label: 'Create Resume', icon: '📝' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen hidden lg:block">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Resume Builder</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                isActive(item.path)
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {user && (
        <div className="p-6 border-t border-gray-200">
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm font-medium text-indigo-900">Logged in as</p>
            <p className="text-sm text-indigo-700 truncate">{user.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
