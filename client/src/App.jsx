import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import PreviewResume from './pages/PreviewResume';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
              <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
              <Route path="/create-resume" element={<ProtectedRoute><AppLayout><CreateResume /></AppLayout></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><AppLayout><EditResume /></AppLayout></ProtectedRoute>} />
              <Route path="/preview/:id" element={<ProtectedRoute><AppLayout><PreviewResume /></AppLayout></ProtectedRoute>} />
            </Routes>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
