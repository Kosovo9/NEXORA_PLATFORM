// src/App.jsx

import { useState, useEffect } from 'react';
import { getRoutines } from './services/strapiApiService'; 
import './App.css';

function App() {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        console.log("Intentando obtener rutinas desde Strapi...");
        const data = await getRoutines();
        console.log("Datos recibidos de Strapi:", data);
        setRoutines(data);
      } catch (err) {
        console.error("Falló la llamada a la API de Strapi:", err);
        setError("No se pudo conectar con el servidor de Strapi. ¿Está encendido?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NutriAvatar - Conexión con Strapi</h1>
        
        <div className="status-card">
          <h2>Estado de la Conexión</h2>
          {isLoading && <p>Cargando datos desde Strapi...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!isLoading && !error && (
            <p style={{ color: 'lightgreen' }}>¡Conexión con Strapi exitosa!</p>
          )}
        </div>

        <div className="routines-list">
          <h2>Lista de Rutinas desde Strapi</h2>
          {routines.length > 0 ? (
            <ul>
              {routines.map((routine) => (
                // CORRECCIÓN FINAL: Accedemos a los campos directamente desde 'routine'
                // Ya no es necesario usar '.attributes' en Strapi v5
                <li key={routine.id}>
                  <strong>{routine.name}</strong> - {routine.difficulty}
                </li>
              ))}
            </ul>
          ) : (
            <p>{!isLoading && "No se encontraron rutinas publicadas."}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
