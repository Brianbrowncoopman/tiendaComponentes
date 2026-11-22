import React, { Component } from 'react';

class FormularioLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      precio: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const nombreLimpio = this.state.nombre.trim();
    const precioNumero = Number(this.state.precio);

    if (
      !nombreLimpio ||
      this.state.precio === '' ||
      Number.isNaN(precioNumero) ||
      precioNumero <= 0
    ) {
      this.setState({
        error: 'Ingresa un nombre válido y un precio mayor a 0.'
      });
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre: nombreLimpio,
      precio: precioNumero
    };

    if (this.props.onAgregarProducto) {
      this.props.onAgregarProducto(nuevoProducto);
    }

    this.setState({
      nombre: '',
      precio: '',
      error: ''
    });
  };

  render() {
    const { nombre, precio, error } = this.state;

    return (
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto 24px auto',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#212529' }}>
            Crear Nuevo Producto
          </h4>

          {this.props.onCerrar && (
            <button
              type="button"
              onClick={this.props.onCerrar}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#6c757d',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#212529'
              }}
            >
              Nombre del Producto:
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Celular Motorola..."
              value={nombre}
              onChange={this.handleChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '0.95rem',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#212529'
              }}
            >
              Precio:
            </label>
            <input
              type="number"
              name="precio"
              placeholder="180000"
              value={precio}
              onChange={this.handleChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '0.95rem',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#f8d7da',
                color: '#842029',
                border: '1px solid #f5c2c7',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                marginBottom: '14px'
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '9px 14px',
                backgroundColor: '#0d6efd',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Guardar Producto
            </button>

            {this.props.onCerrar && (
              <button
                type="button"
                onClick={this.props.onCerrar}
                style={{
                  padding: '9px 14px',
                  backgroundColor: 'transparent',
                  color: '#6c757d',
                  border: '1px solid #6c757d',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default FormularioLocal;