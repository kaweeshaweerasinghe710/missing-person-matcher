import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const loginApi = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    if (error.code === 'ERR_NETWORK') {
      return {
        id: 999,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'CITIZEN',
        token: 'demo-token-' + Date.now(),
        message: 'Demo login successful',
      };
    }
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    if (error.code === 'ERR_NETWORK') {
      return {
        id: 999,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'CITIZEN',
        badgeNumber: userData.badgeNumber,
        token: 'demo-token-' + Date.now(),
        message: 'Demo registration successful',
      };
    }
    throw new Error('Registration failed. Please try again.');
  }
};
