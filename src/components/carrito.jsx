import React, { Component } from 'react';

class Carrito extends Component {
    render() {
        const { carrito, eliminarDelCarrito } = this.props;
        
        const totalPrecio = carrito.reduce((sum, item) => sum + (Number(item.precio || 0) * (item.cantidad || 1)), 0);
        const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);

        return (
            <div className="card p-3 shadow-sm bg-white" style={{ border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
                <h5 className="mb-3 text-dark fw-bold">🛒 Carrito de Compras</h5>
                {carrito.length === 0 ? (
                    <p className="text-muted small mb-0">El carrito está vacío.</p>
                ) : (
                    <div>
                        <ul className="list-group list-group-flush mb-3">
                            {carrito.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
                                    {/* Bloque izquierdo: Nombre y precio */}
                                    <div className="pe-2">
                                        <span className="fw-semibold text-dark small">{item.nombre}</span>
                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                            ${Number(item.precio * (item.cantidad || 1)).toLocaleString()} <span className="small">(${Number(item.precio).toLocaleString()} c/u)</span>
                                        </div>
                                    </div>

                                    {/* Bloque derecho: Cantidad (badge) y botón eliminar juntos */}
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>x{item.cantidad || 1}</span>
                                        <button 
                                            className="btn btn-outline-danger btn-sm border-0" 
                                            onClick={() => eliminarDelCarrito(index)}
                                            title="Eliminar o reducir cantidad"
                                            style={{ padding: '0.25rem 0.5rem' }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded small">
                            <span className="text-muted">Items: {totalItems}</span>
                            <span className="fw-bold text-dark">Total: ${Number(totalPrecio).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Carrito;