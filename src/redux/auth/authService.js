import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);

  if (response.data) {
      localStorage.setItem('auth_registration', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authServices = {
  register,
  login,
};

export default authServices;
