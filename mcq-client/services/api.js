import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Use your backend URL
});

export const register = (data) => API.post('/auth/register', data);

export const login = (data) => API.post('/auth/login', data);

export const getTestData = (token) =>
  API.get('/test', {
    headers: { 'x-auth-token': token },
  });
