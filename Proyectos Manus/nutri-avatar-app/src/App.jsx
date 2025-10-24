// src/App.jsx
import { useState, useEffect } from 'react';
import { getRoutines, getProducts } from './services/strapiApiService'; 
import './App.css';

// VERSIÓN A PRUEBA DE BALAS: Esta función ahora comprueba si la imagen existe antes de intentar mostrarla.
const getStrapiMediaUrl = (media) => {
  // Si no hay 'media' o no hay 'media.data', devuelve una imagen de marcador de posición.
  if (!media || !media.data) {
    return 'https://via.placeholder.com/300x200.png?text=No+Image';
  }
  // Si 'media.data' es un array (para galerías ), toma la primera imagen.
  const imageData = Array.isArray(media.data) ? media.data[0] : media.data;
  
  const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
  const url = imageData.attributes.url;
  return `${baseUrl}${url}`;
};

function App() {
  const [routines, setRoutines] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [routinesData, productsData] = await Promise.all([
        getRoutines(),
        getProducts()
      ]);
      setRoutines(routinesData);
      setProducts(productsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading"><h1>Cargando FitnessPro...</h1></div>;
  }

  return (
    <div className="fitness-pro-app">
      <header className="main-header">
        <h1>Bienvenido a FitnessPro</h1>
        <p>Tu ecosistema de fitness y nutrición</p>
      </header>

      <main>
        <section className="section">
          <h2>Tienda de Suplementos</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {/* El código ahora es más seguro y no se romperá */}
                <img 
                  src={getStrapiMediaUrl(product.attributes.galeria_multimedia)} 
                  alt={product.attributes.nombre} 
                />
                <h3>{product.attributes.nombre}</h3>
                <p className="price">${product.attributes.precio}</p>
                <button>Ver Producto</button>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Rutinas de Entrenamiento</h2>
          <div className="routine-grid">
            {routines.map((routine) => (
              <div key={routine.id} className="routine-card">
                {/* El código ahora es más seguro y no se romperá */}
                 <img 
                  src={getStrapiMediaUrl(routine.attributes.imagen_principal)} 
                  alt={routine.attributes.nombre} 
                />
                <h3>{routine.attributes.nombre}</h3>
                <p className="difficulty">{routine.attributes.dificultad}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
