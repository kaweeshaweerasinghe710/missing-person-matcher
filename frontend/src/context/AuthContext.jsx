import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('mp_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('mp_token') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mp_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('mp_token', token);
    } else {
      localStorage.removeItem('mp_token');
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginApi({ email, password });
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      badgeNumber: data.badgeNumber,
    });
    setToken(data.token);
    return data;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      badgeNumber: data.badgeNumber,
    });
    setToken(data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('mp_user');
    localStorage.removeItem('mp_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
