import React, { Component } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import Producto from './components/producto';
import GestionProductos from './components/gestionProductos';
import Carrito from './components/carrito';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActiva: 'home',
      productos: [],
      carrito: [],
      user: null,
      userRole: null // Guardaremos 'admin' o 'client'
    };
    this.unsubscribeAuth = null;
  }

  componentDidMount() {
    this.cargarProductos();

    this.unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuario logueado: buscamos su rol en Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = 'client'; // Valor por defecto
        if (userDoc.exists()) {
          role = userDoc.data().role || 'client';
        } else {
          // Si por alguna razón no existe el documento, lo creamos como cliente
          await setDoc(userDocRef, { email: user.email, role: 'client' });
        }

        this.setState({ user, userRole: role });
      } else {
        // Si cierra sesión, limpiamos el usuario y el rol
        this.setState({ user: null, userRole: null });
        if (this.state.vistaActiva === 'administracion') {
          this.setState({ vistaActiva: 'home' });
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  cargarProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const listaProductos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.setState({ productos: listaProductos });
    } catch (error) {
      console.error("Error al cargar productos desde Firestore:", error);
    }
  };

  handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Sesión cerrada exitosamente.');
      this.setState({ vistaActiva: 'home', userRole: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  agregarAlCarrito = (productoSeleccionado) => {
    this.setState((prevState) => {
      const index = prevState.carrito.findIndex(item => item.id === productoSeleccionado.id);
      if (index >= 0) {
        const nuevoCarrito = [...prevState.carrito];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: (nuevoCarrito[index].cantidad || 1) + 1
        };
        return { carrito: nuevoCarrito };
      } else {
        return { 
          carrito: [...prevState.carrito, { ...productoSeleccionado, cantidad: 1 }] 
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
    const { vistaActiva, productos, carrito, user, userRole } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <span className="navbar-brand">Eco Pilgua - Tienda Web</span>
          <div className="navbar-nav ms-auto align-items-center">
            <button 
              className={`btn btn-nav text-light me-2 ${vistaActiva === 'home' ? 'active fw-bold border-bottom' : ''}`}
              onClick={() => this.setState({ vistaActiva: 'home' })}
            >
              Inicio (Catálogo)
            </button>

            <button 
              className={`btn btn-nav text-light me-2 ${vistaActiva === 'carrito' ? 'active fw-bold border-bottom' : ''}`}
              onClick={() => this.setState({ vistaActiva: 'carrito' })}
            >
              🛒 Carrito ({carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0)})
            </button>

            {/* SOLO SE MUESTRA EL BOTÓN SI EL USUARIO ES ADMIN */}
            {user && userRole === 'admin' && (
              <button 
                className={`btn btn-nav text-light me-2 ${vistaActiva === 'administracion' ? 'active fw-bold border-bottom' : ''}`}
                onClick={() => this.setState({ vistaActiva: 'administracion' })}
              >
                Administración de productos
              </button>
            )}

            {user ? (
              <div className="d-flex align-items-center ms-3">
                <span className="text-light me-3 small" style={{ opacity: 0.8 }}>
                  {user.email} <span className="badge bg-secondary">{userRole}</span>
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={this.handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button 
                className={`btn btn-outline-light btn-sm ms-2 ${vistaActiva === 'login' ? 'active fw-bold' : ''}`}
                onClick={() => this.setState({ vistaActiva: 'login' })}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>

        <div className="container my-4">
          {vistaActiva === 'home' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Catálogo de Productos</h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={this.cargarProductos}>
                  🔄 Actualizar Catálogo
                </button>
              </div>

              <div className="row">
                <div className="col-md-8">
                  {productos.length === 0 ? (
                    <div className="alert alert-warning">
                      No hay productos registrados en Firestore todavía. 
                      {userRole === 'admin' ? ' Ve a administración para crear uno.' : ''}
                    </div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
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

                <div className="col-md-4">
                  <Carrito 
                    carrito={carrito} 
                    eliminarDelCarrito={this.eliminarDelCarrito} 
                  />
                </div>
              </div>
            </div>
          )}

          {vistaActiva === 'carrito' && (
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Carrito 
                  carrito={carrito} 
                  eliminarDelCarrito={this.eliminarDelCarrito} 
                />
              </div>
            </div>
          )}

          {vistaActiva === 'administracion' && (
            userRole === 'admin' ? (
              <GestionProductos />
            ) : (
              <div className="alert alert-danger text-center mt-5">
                <h4>Acceso denegado</h4>
                <p>No tienes privilegios de administrador para ver esta sección.</p>
              </div>
            )
          )}
          
          {vistaActiva === 'login' && (
            <Login 
              onLoginSuccess={() => this.setState({ vistaActiva: 'home' })} 
              onCancel={() => this.setState({ vistaActiva: 'home' })} 
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;