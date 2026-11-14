import React, { Component } from 'react';   

class Producto extends Component {
    render() {
        const { producto, agregarAlCarrito } = this.props;

        return (
            <div className="card m-2 p-3 shadow-sm " style={{ width: '220px', backgroundColor: '#e1e5e5', borderRadius: '1em', border: '2px solid grey' }}>
                {producto.imagenUrl && (
                    <img 
                        src={producto.imagenUrl} 
                        alt={producto.nombre} 
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '1em', border: '2px solid grey' }} 
                        className="mb-2" 
                    />
                )}
                <h5 className="card-title" style={{fontFamily: 'math',fontWeight: 'bold' }}>{producto.nombre}</h5>
                <p className="card-text text-black fw-bold">Precio: ${producto.precio}</p>
                <button className="btn btn-primary btn-sm mt-auto" style={{borderRadius: '2em', border: '2px solid blue'}} onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito
                </button>
            </div>
        );
    }
}

export default Producto;