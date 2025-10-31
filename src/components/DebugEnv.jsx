

const DebugEnv = () => {
  return (
    <div style={{ background: '#f0f0f0', padding: '20px', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Debug Variables de Entorno</h3>
      <pre>
        {JSON.stringify({
          VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
          VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
          MODE: import.meta.env.MODE,
          DEV: import.meta.env.DEV,
          PROD: import.meta.env.PROD
        }, null, 2)}
      </pre>
    </div>
  );
};

export default DebugEnv;