import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';

export const authService = {
  // Store token
  setToken: (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  // Get token
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  // Check if token is valid
  isTokenValid: () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  },

  // Get user info from token
  getUserInfo: () => {
    const token = authService.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}; 