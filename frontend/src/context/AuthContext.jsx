import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('divishopping_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('divishopping_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/users/register', userData);
      
      const newUserData = response.data;
      setUser(newUserData);
      localStorage.setItem('divishopping_user', JSON.stringify(newUserData));
      return newUserData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error registering user');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('divishopping_user');
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await api.put('/api/users/profile', updatedData);
      
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('divishopping_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
