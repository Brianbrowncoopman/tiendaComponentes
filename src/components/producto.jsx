import React, { Component } from 'react';   

class Producto extends Component {
    render() {
        const { producto, agregarAlCarrito } = this.props;

        return (
            <div className="card m-2 p-3 shadow-sm" style={{ width: '220px' }}>
                {producto.imagenUrl && (
                    <img 
                        src={producto.imagenUrl} 
                        alt={producto.nombre} 
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }} 
                        className="mb-2" 
                    />
                )}
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-success fw-bold">Precio: ${producto.precio}</p>
                <button className="btn btn-primary btn-sm mt-auto" onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito
                </button>
            </div>
        );
    }
}

export default Producto;