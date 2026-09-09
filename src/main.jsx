import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

const enableMocking = async () => {
  if (import.meta.env.VITE_USE_MSW !== 'true') {
    return;
  }
  const { worker } = await import('@/mocks/browser.js');
  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
