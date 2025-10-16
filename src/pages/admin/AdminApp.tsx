import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';
  
  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Vérifier la validité du token
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch (error) {
      localStorage.removeItem('admin_token');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardPage onLogout={handleLogout} />;
}