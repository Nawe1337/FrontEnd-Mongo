import axios from 'axios';

// Con el proxy configurado en vite.config.js, podemos usar rutas relativas
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productosAPI = {
  // Obtener todos los productos
  getAll: () => api.get('/productos'),
  
  // Obtener producto por ID
  getById: (id) => api.get(`/productos/${id}`),
  
  // Crear nuevo producto
  create: (productoData) => api.post('/productos', productoData),
  
  // Actualizar producto
  update: (id, productoData) => api.put(`/productos/${id}`, productoData),
  
  // Eliminar producto
  delete: (id) => api.delete(`/productos/${id}`),
};

export default api;