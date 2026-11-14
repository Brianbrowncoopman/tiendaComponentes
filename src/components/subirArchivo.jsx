import React, { Component } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

class SubirArchivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archivo: null,
      urlImagen: '',
      subiendo: false
    };
  }

  handleFileChange = (e) => {
    this.setState({ archivo: e.target.files[0] });
  };

  handleUpload = async (e) => {
    e.preventDefault();
    const { archivo } = this.state;
    if (!archivo) return;

    this.setState({ subiendo: true });

    try {
      // Crear una referencia en el storage bajo la carpeta "productos/"
      const storageRef = ref(storage, `productos/${Date.now()}_${archivo.name}`);
      
      // Subir el archivo
      await uploadBytes(storageRef, archivo);
      
      // Obtener la URL pública de descarga
      const url = await getDownloadURL(storageRef);
      
      this.setState({ urlImagen: url, subiendo: false, archivo: null });
      alert('¡Archivo subido exitosamente a Firebase Storage!');
    } catch (error) {
      console.error("Error al subir archivo:", error);
      this.setState({ subiendo: false });
      alert('Hubo un error al subir el archivo.');
    }
  };

  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <div className="card shadow p-4">
          <h3 className="mb-3 text-center">Subir Imagen (Storage)</h3>
          
          <form onSubmit={this.handleUpload}>
            <div className="mb-3">
              <input 
                type="file" 
                className="form-control" 
                onChange={this.handleFileChange} 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={this.state.subiendo}
            >
              {this.state.subiendo ? 'Subiendo...' : 'Subir a Firebase Storage'}
            </button>
          </form>

          {this.state.urlImagen && (
            <div className="mt-4 text-center">
              <p>Imagen cargada correctamente:</p>
              <img src={this.state.urlImagen} alt="Vista previa" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SubirArchivo;