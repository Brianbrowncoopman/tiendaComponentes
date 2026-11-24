import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

class Formulario extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            precio: '',
            archivo: null,
            subiendo: false,
            urlImagen: ''
        };

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio.',
                numeric: 'Debe ingresar un valor valido'
            }
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
        this.setState({ archivo: e.target.files[0] });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {
            try {
                this.setState({ subiendo: true });
                let urlFinal = '';

                // Si se seleccionó un archivo, lo subimos a Firebase Storage primero
                if (this.state.archivo) {
                    const storageRef = ref(storage, `productos/${Date.now()}_${this.state.archivo.name}`);
                    await uploadBytes(storageRef, this.state.archivo);
                    urlFinal = await getDownloadURL(storageRef);
                }

                // Guardamos los datos del producto junto con la URL de la imagen en Firestore
                await addDoc(collection(db, "productos"), {
                    nombre: this.state.nombre,
                    precio: this.state.precio,
                    imagenUrl: urlFinal,
                    createdAt: new Date()
                });

                alert('¡Datos e imagen guardados exitosamente en Firestore!');
                this.setState({ 
                    nombre: '', 
                    precio: '', 
                    archivo: null, 
                    urlImagen: urlFinal, 
                    subiendo: false 
                });
                this.validator.hideMessages();
            } catch (error) {
                console.error("Error al guardar en Firebase: ", error);
                this.setState({ subiendo: false });
                alert('Hubo un error al guardar el registro');
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        return (
            <div className="container mt-5" style={{ maxWidth: '500px' }}>
                <div className="card shadow p-4">
                    <h2 className="mb-4 text-center">Registro de Producto </h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Nombre del Producto:</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                placeholder='Celuar Motorola...'
                                className="form-control"
                                value={this.state.nombre} 
                                onChange={this.handleChange} 
                            />
                            <div className="text-danger small mt-1">
                                {this.validator.message('nombre', this.state.nombre, 'required')}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Precio:</label>
                            <input 
                                type="number" 
                                name="precio" 
                                placeholder='$180.000...'
                                className="form-control"
                                value={this.state.precio} 
                                onChange={this.handleChange} 
                            />
                            <div className="text-danger small mt-1">
                                {this.validator.message('precio', this.state.precio, 'required|numeric')}//validador RSV
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Imagen del Producto:</label>
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
                            {this.state.subiendo ? 'Guardando...' : 'Guardar en Catalogo'}
                        </button>
                    </form>

                    {this.state.urlImagen && (
                        <div className="mt-4 text-center">
                            <p className="text-success">Última imagen subida:</p>
                            <img src={this.state.urlImagen} alt="Vista previa" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Formulario;