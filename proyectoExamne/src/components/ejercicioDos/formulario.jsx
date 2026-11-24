import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      precio: '',
      guardando: false
    };

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Este campo es obligatorio.',
        numeric: 'Debe ingresar un valor válido'
      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {
      try {
        this.setState({ guardando: true });

        const datosProducto = {
          nombre: this.state.nombre.trim(),
          precio: Number(this.state.precio),
          createdAt: new Date()
        };

        const docRef = await addDoc(collection(db, 'productosEjercicioDos'), datosProducto);

        const productoCreado = {
          id: docRef.id,
          ...datosProducto
        };

        if (this.props.onProductoGuardado) {
          this.props.onProductoGuardado(productoCreado);
        }

        alert('¡Producto guardado exitosamente en Firestore!');
        this.setState({
          nombre: '',
          precio: '',
          guardando: false
        });
        this.validator.hideMessages();
      } catch (error) {
        console.error('Error al guardar en Firestore:', error);
        this.setState({ guardando: false });
        alert('Hubo un error al guardar el producto en Firestore.');
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { nombre, precio, guardando } = this.state;

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
            Registrar Producto en Firestore
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
            <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
              {this.validator.message('nombre', nombre, 'required')}
            </div>
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
            <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
              {this.validator.message('precio', precio, 'required|numeric')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={guardando}
              style={{
                flex: 1,
                padding: '9px 14px',
                backgroundColor: guardando ? '#6ea8fe' : '#0d6efd',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: guardando ? 'not-allowed' : 'pointer'
              }}
            >
              {guardando ? 'Guardando en Firestore...' : 'Guardar en Firestore'}
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

export default Formulario;