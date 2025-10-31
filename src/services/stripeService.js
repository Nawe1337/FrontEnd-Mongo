import { loadStripe } from '@stripe/stripe-js';

// Clave pública de Stripe desde variables de entorno
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const stripeService = {
  async createCheckoutSession(cartItems) {
    try {
      const response = await fetch(`${API_BASE_URL}/pagos/crear-sesion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          success_url: `${window.location.origin}/pago-exitoso`,
          cancel_url: `${window.location.origin}/carrito`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creando sesión de pago');
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async verifyPayment(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/pagos/verificar-sesion/${sessionId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error verificando pago');
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};