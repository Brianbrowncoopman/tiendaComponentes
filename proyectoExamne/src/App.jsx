import React, { useState } from 'react';
import Tienda from './components/ejercicioTres/tienda';
import EjercicioUno from './components/ejercicioUno/ejercicioUno';
import EjercicioDos from './components/ejercicioDos/ejercicioDos';

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');


  if (seccionActiva === 'ejercicioUno') {
    return <EjercicioUno onVolverInicio={() =>setSeccionActiva('inicio')} />
  }

  if (seccionActiva === 'ejercicioDos') {
    return <EjercicioDos onVolverInicio={() =>setSeccionActiva('inicio')} />
  }


  // Al hacer clic en el Botón 3, se muestra el proyecto actual completo
  if (seccionActiva === 'proyectoTienda') {
    return <Tienda onVolverInicio={() => setSeccionActiva('inicio')} />;
  }

  
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-5 text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-3">Proyecto Examen</h1>
        <p className="text-muted mb-4">Selecciona una opción para continuar:</p>

        <div className="d-grid gap-3">
          <button
            type='button'
            className="btn btn-outline-primary btn-lg"
            onClick={() => setSeccionActiva('ejercicioUno')}
          >
            Ejercicio 1
          </button>

          <button
            type='button'
            className="btn btn-outline-primary btn-lg"
            onClick={() => setSeccionActiva('ejercicioDos')}
          >
            Ejercicio 2
          </button>

          <button
            type='button'
            className="btn btn-outline-primary btn-lg"
            onClick={() => setSeccionActiva('proyectoTienda')}
          >
            Ejercicio 3 
          </button>
        </div>

        {/* Vista temporal por si haces clic en Botón 1 o Botón 2 */}
        {seccionActiva === 'opcion1' && (
          <div className="alert alert-info mt-4 mb-0">
            Contenido del Botón 1 (en construcción)
          </div>
        )}

        {seccionActiva === 'opcion2' && (
          <div className="alert alert-info mt-4 mb-0">
            Contenido del Botón 2 (en construcción)
          </div>
        )}
      </div>
    </div>
  );
}

export default App;