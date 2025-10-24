import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Bienvenido a TechStore</h1>
        <p>Descubre los mejores productos tecnológicos al mejor precio</p>
        <Link to="/productos" className="btn-primary">
          Ver Productos
        </Link>
      </section>
      
      <section className="features-section">
        <div className="feature-card">
          <h3>🚀 Tecnología de Vanguardia</h3>
          <p>Los últimos productos tecnológicos del mercado</p>
        </div>
        
        <div className="feature-card">
          <h3>💳 Precios Competitivos</h3>
          <p>Las mejores ofertas y precios del mercado</p>
        </div>
        
        <div className="feature-card">
          <h3>📦 Envío Rápido</h3>
          <p>Recibe tus productos en tiempo récord</p>
        </div>
      </section>
    </div>
  );
};

export default Home;