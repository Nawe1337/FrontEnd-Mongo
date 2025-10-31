
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import './index.css';
import PagoExitoso from './pages/PagoExitoso';
import DebugEnv from './components/DebugEnv';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <DebugEnv />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} />
              <Route path="*" element={
                <div className="not-found">
                  <h2>404 - Página No Encontrada</h2>
                  <p>La página que buscas no existe.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;