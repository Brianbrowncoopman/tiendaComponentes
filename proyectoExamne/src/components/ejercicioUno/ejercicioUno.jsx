import React, { Component } from 'react';
import Producto from './producto';
import Carrito from './carrito';
import FormularioLocal from './formulario';

class EjercicioUno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        { id: 1, nombre: 'Notebook Lenovo ThinkPad', precio: 650000, imagenUrl: '' },
        { id: 2, nombre: 'Mouse Inalámbrico Logitech', precio: 25000, imagenUrl: '' },
        { id: 3, nombre: 'Teclado Mecánico RGB', precio: 48000, imagenUrl: '' }
      ],
      carrito: [],
      mostrarFormulario: false
    };
  }

  agregarProductoALista = (nuevoProducto) => {
    this.setState((prevState) => ({
      productos: [...prevState.productos, nuevoProducto],
      mostrarFormulario: false
    }));
  };

  agregarAlCarrito = (productoSeleccionado) => {
    this.setState((prevState) => {
      const index = prevState.carrito.findIndex(
        (item) => item.id === productoSeleccionado.id
      );

      if (index >= 0) {
        const nuevoCarrito = [...prevState.carrito];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: (nuevoCarrito[index].cantidad || 1) + 1
        };
        return { carrito: nuevoCarrito };
      } else {
        return {
          carrito: [
            ...prevState.carrito,
            { ...productoSeleccionado, cantidad: 1 }
          ]
        };
      }
    });
  };

  eliminarDelCarrito = (indexToRemove) => {
    this.setState((prevState) => {
      const nuevoCarrito = [...prevState.carrito];
      if (nuevoCarrito[indexToRemove].cantidad > 1) {
        nuevoCarrito[indexToRemove] = {
          ...nuevoCarrito[indexToRemove],
          cantidad: nuevoCarrito[indexToRemove].cantidad - 1
        };
        return { carrito: nuevoCarrito };
      } else {
        return {
          carrito: nuevoCarrito.filter((_, index) => index !== indexToRemove)
        };
      }
    });
  };

  render() {
    const { productos, carrito, mostrarFormulario } = this.state;

    return (
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          padding: '24px',
          boxSizing: 'border-box',
          backgroundColor: '#f4f6f9',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            padding: '0 12px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {this.props.onVolverInicio ? (
            <button
              type="button"
              onClick={this.props.onVolverInicio}
              style={{
                padding: '7px 14px',
                backgroundColor: '#ffffff',
                color: '#495057',
                border: '1px solid #6c757d',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ← Menú Principal
            </button>
          ) : (
            <span />
          )}

          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#212529' }}>
            Ejercicio 1 — Lista de Productos
          </h2>

          <button
            type="button"
            onClick={() =>
              this.setState((prevState) => ({
                mostrarFormulario: !prevState.mostrarFormulario
              }))
            }
            style={{
              padding: '7px 14px',
              backgroundColor: mostrarFormulario ? '#dc3545' : '#198754',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {mostrarFormulario ? '✕ Cerrar Formulario' : '+ Crear Producto'}
          </button>
        </div>

        {mostrarFormulario && (
          <div style={{ padding: '0 12px' }}>
            <FormularioLocal
              onAgregarProducto={this.agregarProductoALista}
              onCerrar={() => this.setState({ mostrarFormulario: false })}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: '24px',
            padding: '0 12px',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ flex: '3 1 500px' }}>
            {productos.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#fff3cd',
                  color: '#664d03',
                  border: '1px solid #ffecb5',
                  borderRadius: '8px',
                  padding: '14px'
                }}
              >
                No hay productos en la lista. Haz clic en "+ Crear Producto".
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                {productos.map((prod) => (
                  <Producto
                    key={prod.id}
                    producto={prod}
                    agregarAlCarrito={this.agregarAlCarrito}
                  />
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              flex: '1 1 280px',
              position: 'sticky',
              top: '20px',
              height: 'fit-content'
            }}
          >
            <Carrito
              carrito={carrito}
              eliminarDelCarrito={this.eliminarDelCarrito}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EjercicioUno;