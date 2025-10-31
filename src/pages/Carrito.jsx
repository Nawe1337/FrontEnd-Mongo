 
  import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { stripeService } from '../services/stripeService';

const Carrito = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const { sessionId, url } = await stripeService.createCheckoutSession(items);
      
      // Redirigir a Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
            <img
              src={item.imagen || 'https://via.placeholder.com/80x80/4A5568/FFFFFF?text=Imagen'}
              alt={item.nombre}
              />
          </div>
        ))}
      </div>

      <div className="carrito-summary">
        <div className="summary-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <p className="shipping-note">✅ Envío gratis en compras mayores a $50</p>
        </div>
        <div className="summary-actions">
          <Link to="/productos" className="btn-seguir-comprando">
            ← Seguir Comprando
          </Link>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="btn-finalizar-compra"
          >
            {loading ? 'Procesando...' : '🛒 Proceder al Pago'}
          </button>
        </div>
        
        {/* Información de tarjetas de prueba */}
        <div className="test-cards-info">
          <h4>💳 Tarjetas de Prueba Stripe:</h4>
          <div className="test-cards">
            <p><strong>Visa:</strong> 4242 4242 4242 4242</p>
            <p><strong>MM/AA:</strong> Cualquier fecha futura</p>
            <p><strong>CVC:</strong> Cualquier 3 dígitos</p>
            <p><strong>Código Postal:</strong> Cualquier 5 dígitos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;