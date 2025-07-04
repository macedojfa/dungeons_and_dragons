import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

setTimeout(() => {
  root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
  );
}, 2000);

