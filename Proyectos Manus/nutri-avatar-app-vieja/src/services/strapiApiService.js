// src/services/strapiApiService.js
import axios from 'axios';

// Leemos la URL base de Strapi desde nuestro archivo .env
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_BASE_URL;

// Creamos una instancia de Axios para comunicarnos con Strapi
const apiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Obtiene la lista de rutinas desde el servidor Strapi.
 * @returns {Promise<Object[]>}
 */
export const getRoutines = async () => {
  try {
    // La ruta de la API de Strapi para nuestro modelo "Routine"
    // Por defecto, Strapi usa el nombre en plural y minúsculas.
    const response = await apiClient.get('/api/routines');
    
    // CORRECCIÓN: Devolvemos los datos directamente.
    // La v5 de Strapi ya no envuelve la respuesta en un segundo objeto 'data'.
    return response.data; 
  } catch (error) {
    console.error("Error al obtener las rutinas desde Strapi:", error);
    // Devolvemos un array vacío en caso de error para que la app no se rompa.
    return []; 
  }
};

// Aquí podremos añadir más funciones en el futuro, como:
// export const getProducts = async () => { ... };
