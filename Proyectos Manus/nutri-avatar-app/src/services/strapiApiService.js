// src/services/strapiApiService.js
import axios from 'axios';

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_BASE_URL;

const apiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Obtiene la lista de TODAS las rutinas desde Strapi.
 * La ruta correcta es /api/routines (plural).
 */
export const getRoutines = async () => {
  try {
    const response = await apiClient.get('/api/routines?populate=*');
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    return []; 
  }
};

/**
 * Obtiene la lista de TODOS los productos desde Strapi.
 * CORRECCIÓN: La ruta correcta es /api/products (plural), no /api/producto.
 */
export const getProducts = async () => {
  try {
    // ESTA ES LA LÍNEA CORREGIDA
    const response = await apiClient.get('/api/products?populate=*');
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};

