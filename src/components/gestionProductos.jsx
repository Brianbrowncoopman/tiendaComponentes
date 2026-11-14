import React, { Component } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Formulario from './formulario';

class GestionProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subVista: 'registrar', // 'registrar' o 'listar'
      productos: [],
      productoEditando: null // Almacena el producto que se está editando
    };
  }

  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const lista = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      this.setState({ productos: lista });
    } catch (error) {
      console.error("Error al cargar productos para administrar:", error);
    }
  };

  handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto de la base de datos?")) {
      try {
        // Solo eliminamos el documento en Firestore. 
        // La Cloud Function se encargará automáticamente de borrar la imagen asociada en Storage.
        await deleteDoc(doc(db, "productos", id));
        alert("Producto eliminado exitosamente.");
        
        if (this.state.productoEditando && this.state.productoEditando.id === id) {
          this.setState({ productoEditando: null });
        }
        this.cargarProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  iniciarEdicion = (producto) => {
    this.setState({
      productoEditando: {
        id: producto.id,
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        descripcion: producto.descripcion || '',
        imagenUrl: producto.imagenUrl || ''
      }
    });
  };

  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      productoEditando: {
        ...prevState.productoEditando,
        [name]: value
      }
    }));
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState(prevState => ({
          productoEditando: {
            ...prevState.productoEditando,
            imagenUrl: reader.result // Nueva imagen cargada
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  handleGuardarEdicion = async (e) => {
    e.preventDefault();
    const { productoEditando } = this.state;

    if (!productoEditando.nombre.trim() || Number(productoEditando.precio) <= 0) {
      alert("Por favor, ingresa un nombre válido y un precio mayor a 0.");
      return;
    }

    try {
      // Actualizamos el documento en Firestore.
      // Si la imagen cambió, la Cloud Function detectará el cambio y limpiará la anterior de Storage.
      const productoRef = doc(db, "productos", productoEditando.id);
      await updateDoc(productoRef, {
        nombre: productoEditando.nombre.trim(),
        precio: Number(productoEditando.precio),
        descripcion: productoEditando.descripcion.trim(),
        imagenUrl: productoEditando.imagenUrl.trim()
      });

      alert("¡Producto actualizado correctamente!");
      this.setState({ productoEditando: null });
      this.cargarProductos();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto en Firestore.");
    }
  };

  cancelarEdicion = () => {
    this.setState({ productoEditando: null });
  };

  render() {
    const { subVista, productos, productoEditando } = this.state;

    return (
      <div className="container mt-4">
        {/* Submenú de opciones de administración */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${subVista === 'registrar' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => this.setState({ subVista: 'registrar', productoEditando: null })}
            >
              ➕ Registrar Producto
            </button>
            <button 
              type="button" 
              className={`btn ${subVista === 'listar' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                this.setState({ subVista: 'listar' });
                this.cargarProductos();
              }}
            >
              📋 Listar, Editar y Eliminar (BBDD)
            </button>
          </div>
        </div>

        {/* Vista 1: Formulario de Registro */}
        {subVista === 'registrar' && (
          <Formulario onProductoRegistrado={this.cargarProductos} />
        )}

        {/* Vista 2: Listado, Edición y Eliminación */}
        {subVista === 'listar' && (
          <div>
            {productoEditando && (
              <div className="card shadow p-4 mb-4 border-warning">
                <h4 className="mb-3 text-warning-emphasis">✏️ Editando: {productoEditando.nombre}</h4>
                <form onSubmit={this.handleGuardarEdicion}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre del Producto:</label>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={productoEditando.nombre}
                        onChange={this.handleEditChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Precio ($):</label>
                      <input
                        type="number"
                        name="precio"
                        className="form-control"
                        value={productoEditando.precio}
                        onChange={this.handleEditChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción (opcional):</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      rows="2"
                      value={productoEditando.descripcion}
                      onChange={this.handleEditChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Imagen del Producto (Cambiar archivo):</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={this.handleFileChange}
                    />
                    {productoEditando.imagenUrl && (
                      <div className="mt-2 d-flex align-items-center gap-2">
                        <img 
                          src={productoEditando.imagenUrl} 
                          alt="Vista previa" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                        />
                        <span className="text-muted small">Imagen actual / seleccionada</span>
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={this.cancelarEdicion}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-warning fw-bold"
                    >
                      💾 Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="card shadow p-4">
              <h3 className="mb-4 text-center">Listado de Productos en la Base de Datos</h3>
              {productos.length === 0 ? (
                <p className="text-center text-muted">No hay productos registrados en la base de datos.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            {prod.imagenUrl ? (
                              <img 
                                src={prod.imagenUrl} 
                                alt={prod.nombre} 
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                              />
                            ) : (
                              <span className="text-muted small">Sin imagen</span>
                            )}
                          </td>
                          <td className="fw-bold">{prod.nombre}</td>
                          <td className="text-success">${prod.precio}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-warning btn-sm"
                                onClick={() => this.iniciarEdicion(prod)}
                              >
                                ✏️ Editar
                              </button>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => this.handleEliminar(prod.id)}
                              >
                                🗑️ Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GestionProductos;