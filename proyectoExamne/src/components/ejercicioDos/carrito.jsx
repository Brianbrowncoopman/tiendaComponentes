import React, { Component } from 'react';

class Carrito extends Component {
  render() {
    const { carrito, eliminarDelCarrito } = this.props;

    const totalPrecio = carrito.reduce(
      (sum, item) => sum + Number(item.precio || 0) * (item.cantidad || 1),
      0
    );
    const totalItems = carrito.reduce(
      (sum, item) => sum + (item.cantidad || 1),
      0
    );

    return (
      <div
        style={{
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
        }}
      >
        <h5
          style={{
            margin: '0 0 14px 0',
            color: '#212529',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          🛒 Carrito de Compras
        </h5>

        {carrito.length === 0 ? (
          <p
            style={{
              color: '#6c757d',
              fontSize: '0.875rem',
              margin: 0
            }}
          >
            El carrito está vacío.
          </p>
        ) : (
          <div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 14px 0'
              }}
            >
              {carrito.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #e9ecef'
                  }}
                >
                  <div style={{ paddingRight: '8px' }}>
                    <span
                      style={{
                        fontWeight: '600',
                        color: '#212529',
                        fontSize: '0.875rem',
                        display: 'block'
                      }}
                    >
                      {item.nombre}
                    </span>
                    <div
                      style={{
                        color: '#6c757d',
                        fontSize: '0.8rem'
                      }}
                    >
                      ${Number(item.precio * (item.cantidad || 1)).toLocaleString()}{' '}
                      <span style={{ fontSize: '0.75rem' }}>
                        (${Number(item.precio).toLocaleString()} c/u)
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#6c757d',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '2px 7px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      x{item.cantidad || 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => eliminarDelCarrito(index)}
                      title="Eliminar o reducir cantidad"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#dc3545',
                        border: '1px solid #dc3545',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}
            >
              <span style={{ color: '#6c757d' }}>Items: {totalItems}</span>
              <span style={{ fontWeight: 'bold', color: '#212529' }}>
                Total: ${Number(totalPrecio).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Carrito;