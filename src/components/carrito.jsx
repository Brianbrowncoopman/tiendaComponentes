import React, { Component } from 'react';

class Carrito extends Component {
    render() {
        const { carrito, eliminarDelCarrito } = this.props;
        
        // Calcular precio total y cantidad total de items
        const totalPrecio = carrito.reduce((sum, item) => sum + (Number(item.precio || 0) * (item.cantidad || 1)), 0);
        const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);

        return (
            <div className="card p-4 shadow-sm">
                <h3 className="mb-3">🛒 Carrito de Compras</h3>
                {carrito.length === 0 ? (
                    <p className="text-muted">El carrito está vacío.</p>
                ) : (
                    <div>
                        <ul className="list-group mb-3">
                            {carrito.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fw-bold">{item.nombre}</span>
                                        <span className="badge bg-primary ms-2">x{item.cantidad || 1}</span>
                                        <br />
                                        <small className="text-success">${item.precio * (item.cantidad || 1)} (${item.precio} c/u)</small>
                                    </div>
                                    <button 
                                        className="btn btn-outline-danger btn-sm" 
                                        onClick={() => eliminarDelCarrito(index)}
                                        title="Reducir o eliminar"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                            <strong>Total items: {totalItems}</strong>
                            <strong className="text-success fs-5">Total: ${totalPrecio}</strong>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Carrito;