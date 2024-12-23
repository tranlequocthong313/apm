import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'animate.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './configs/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
