import React, { Component } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Asegúrate de importar 'db' desde tu archivo firebase.js
import { doc, setDoc, getDoc } from 'firebase/firestore';

class Login extends Component {//formulario del login
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      isRegistering: false,
      showPassword: false,
      showConfirmPassword: false
    };
  }
  //manejador de los cambios al escribir en los inputs
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
   //manejador del envio
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: '' });

    try {
      if (this.state.isRegistering) {
        // Validaciones de registro
        if (this.state.password.length < 6) {
          this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' });
          return;
        }

        if (this.state.password !== this.state.confirmPassword) {
          this.setState({ error: 'Las contraseñas no coinciden. Por favor, revísalas.' });
          return;
        }

        // 1. Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, this.state.email, this.state.password);
        const user = userCredential.user;

        // 2. Guardar perfil en Firestore con rol 'client' por defecto
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: 'client', //solo permite leer y ocupar el carrito
          createdAt: new Date()
        });

        alert('¡Cuenta creada con éxito!');
        if (this.props.onLoginSuccess) {
          this.props.onLoginSuccess('client');
        }

      } else {
        // 1. Iniciar sesión en Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
        const user = userCredential.user;

        // 2. Leer el rol desde Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        let userRole = 'client'; // Valor por defecto si no existe el documento
        if (userDoc.exists()) {
          userRole = userDoc.data().role || 'client';
        } else {
          // Si por alguna razón el usuario está en Auth pero no en Firestore, lo creamos como cliente
          await setDoc(userDocRef, { email: user.email, role: 'client' });
        }

        alert(`¡Inicio de sesión exitoso! (${userRole})`);
        
        if (this.props.onLoginSuccess) {
          this.props.onLoginSuccess(userRole); // Pasamos el rol hacia arriba
        }
      }
      
    } catch (error) {
      let mensajeError = 'Ocurrió un error de autenticación.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensajeError = 'Este correo ya está registrado.';
          break;
        case 'auth/weak-password':
          mensajeError = 'La contraseña es muy débil (mínimo 6 caracteres).';
          break;
        case 'auth/invalid-email':
          mensajeError = 'El formato del correo electrónico no es válido.';
          break;
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          mensajeError = 'Correo o contraseña incorrectos.';
          break;
        default:
          mensajeError = error.message;
      }
      this.setState({ error: mensajeError });
    }
  };

  toggleMode = () => {
    this.setState(prevState => ({
      isRegistering: !prevState.isRegistering,
      error: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    }));
  };

  toggleShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  toggleShowConfirmPassword = () => {
    this.setState(prevState => ({ showConfirmPassword: !prevState.showConfirmPassword }));
  };

  render() {
    const { 
      isRegistering, 
      email, 
      password, 
      confirmPassword, 
      error, 
      showPassword, 
      showConfirmPassword 
    } = this.state;

    return (
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <div className="card shadow p-4">
          <h3 className="mb-3 text-center">
            {isRegistering ? 'Crear Cuenta' : 'Acceso (Firebase Auth)'}
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input 
                type="email" 
                name="email" 
                className="form-control"
                value={email} 
                onChange={this.handleChange} 
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <div className="input-group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  className="form-control"
                  value={password} 
                  onChange={this.handleChange} 
                  required
                />
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={this.toggleShowPassword}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {isRegistering && (
              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña:</label>
                <div className="input-group">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword" 
                    className="form-control"
                    value={confirmPassword} 
                    onChange={this.handleChange} 
                    required
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={this.toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className={`btn ${isRegistering ? 'btn-primary' : 'btn-success'} w-100 mb-2`}
            >
              {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </form>

          <button 
            type="button" 
            className="btn btn-link w-100 text-decoration-none mt-1" 
            onClick={this.toggleMode}
          >
            {isRegistering 
              ? '¿Ya tienes una cuenta? Inicia sesión' 
              : '¿No estás inscrito? Regístrate aquí'}
          </button>

          {this.props.onCancel && (
            <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={this.props.onCancel}>
              Volver al Inicio
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Login;