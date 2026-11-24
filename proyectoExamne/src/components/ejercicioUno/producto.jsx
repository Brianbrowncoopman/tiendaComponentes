import React, { Component } from 'react';

class Producto extends Component {
  render() {
    const { producto, agregarAlCarrito } = this.props;

    return (
      <div
        style={{
          width: '220px',
          margin: '8px',
          padding: '16px',
          backgroundColor: '#e1e5e5',
          borderRadius: '1em',
          border: '2px solid grey',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          {producto.imagenUrl && (
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '1em',
                border: '2px solid grey',
                marginBottom: '10px',
                display: 'block'
              }}
            />
          )}

          <h5
            style={{
              fontFamily: 'math',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              margin: '0 0 8px 0',
              color: '#111827'
            }}
          >
            {producto.nombre}
          </h5>

          <p
            style={{
              color: '#000000',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              fontSize: '0.95rem'
            }}
          >
            Precio: ${Number(producto.precio).toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          style={{
            borderRadius: '2em',
            border: '2px solid blue',
            backgroundColor: '#0d6efd',
            color: '#ffffff',
            padding: '6px 12px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%'
          }}
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    );
  }
}

export default Producto;