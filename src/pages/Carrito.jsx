
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="carrito-page">
        <div className="carrito-vacio">
          <h2>🛒 Tu carrito está vacío</h2>
          <p>¡Descubre nuestros productos y añade algunos a tu carrito!</p>
          <Link to="/productos" className="btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <div className="carrito-header">
        <h1>Tu Carrito de Compras</h1>
        <div className="carrito-stats">
          <span>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
          <span>Total: ${total.toFixed(2)}</span>
        </div>
        <button onClick={clearCart} className="btn-limpiar">
          🗑️ Limpiar Carrito
        </button>
      </div>

      <div className="carrito-items">
        {items.map((item) => (
          <div key={item._id} className="carrito-item">
            <div className="item-image">
              <img 
                src={item.imagen || 'https://via.placeholder.com/80x80/4A5568/FFFFFF?text=Imagen'} 
                alt={item.nombre}
              />
            </div>
            
            <div className="item-info">
              <h3 className="item-nombre">{item.nombre}</h3>
              <p className="item-descripcion">{item.descripcion}</p>
              <span className="item-precio">${item.precio}</span>
            </div>

            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="btn-quantity"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="btn-quantity"
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              
              <div className="item-subtotal">
                ${(item.precio * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item._id)}
                className="btn-eliminar"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-summary">
        <div className="summary-total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <div className="summary-actions">
          <Link to="/productos" className="btn-seguir-comprando">
            ← Seguir Comprando
          </Link>
          <button className="btn-finalizar-compra">
            🛒 Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;