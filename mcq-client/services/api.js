import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Dynamic baseURL
});

// Attach token automatically to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

// API methods
export const register = (data) => API.post('/auth/register', data);

export const login = (data) => API.post('/auth/login', data);

export const getQuestions = () => API.get('/questions');

export const submitTest = (data) => API.post('/test/submit', data );

export const getResults = (id) => API.get(`/test/results/${id}`);


