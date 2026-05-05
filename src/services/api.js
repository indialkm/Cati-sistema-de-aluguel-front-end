import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/cati/api/', 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Verifica se o token não está vindo com aspas extras
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token enviado no header:", token);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;