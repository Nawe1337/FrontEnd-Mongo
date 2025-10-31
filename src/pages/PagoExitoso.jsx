import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { stripeService } from '../services/stripeService';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState('verificando');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setPaymentStatus('error');
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const { session } = await stripeService.verifyPayment(sessionId);
      
      if (session.payment_status === 'paid') {
        setPaymentStatus('success');
        setOrderDetails(session);
        clearCart(); // Limpiar carrito después de pago exitoso
      } else {
        setPaymentStatus('pending');
      }
    } catch (error) {
      console.error('Error verificando pago:', error);
      setPaymentStatus('error');
    }
  };

  if (paymentStatus === 'verificando') {
    return (
      <div className="pago-page">
        <div className="pago-verificando">
          <div className="loading-spinner"></div>
          <h2>Verificando tu pago...</h2>
          <p>Por favor espera un momento.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="pago-page">
        <div className="pago-error">
          <h2>❌ Error en el pago</h2>
          <p>Hubo un problema al procesar tu pago. Por favor intenta nuevamente.</p>
          <Link to="/carrito" className="btn-primary">
            Volver al Carrito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-page">
      <div className="pago-exitoso">
        <div className="success-icon">✅</div>
        <h1>¡Pago Exitoso!</h1>
        <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
        
        {orderDetails && (
          <div className="order-details">
            <h3>Detalles de tu orden:</h3>
            <p><strong>ID de transacción:</strong> {orderDetails.id}</p>
            <p><strong>Total pagado:</strong> ${orderDetails.amount_total}</p>
            <p><strong>Estado:</strong> {orderDetails.payment_status}</p>
            {orderDetails.customer_details && (
              <p><strong>Email:</strong> {orderDetails.customer_details.email}</p>
            )}
          </div>
        )}

        <div className="next-steps">
          <h3>Próximos pasos:</h3>
          <ul>
            <li>📧 Recibirás un email de confirmación</li>
            <li>🚚 Tu pedido será enviado en 24-48 horas</li>
            <li>📞 Te contactaremos si hay algún problema</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/productos" className="btn-seguir-comprando">
            Seguir Comprando
          </Link>
          <Link to="/" className="btn-inicio">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;