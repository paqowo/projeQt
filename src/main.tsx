import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import './index.css';

if (import.meta.env.DEV) {
  const fromVite = (import.meta as any).hot?.ws?.url;
  const host = (globalThis as any).__TAURI_DEV_HOST__ || 'localhost';
  const port = (globalThis as any).__TAURI_DEV_PORT__ || '5173';
  const scheme = 'ws';
  const fallback = `${scheme}://${host}:${port}/@vite/ws`;
  const wsUrl = fromVite ?? fallback;

  console.log(
    `[HMR DEBUG] hot.ws.url = ${fromVite ?? 'undefined'}, fallback = ${fallback}`,
  );

  console.log('[HMR DEBUG] WebSocket connect ->', wsUrl);

  let heartbeatId: number | undefined;
  const ws = new WebSocket(wsUrl);

  ws.addEventListener('open', () => {
    console.log('[HMR DEBUG] WebSocket OPEN');
    heartbeatId = window.setInterval(() => {
      try {
        ws.send('ping');
      } catch (err) {
        console.warn('[HMR DEBUG] WebSocket ping failed', err);
      }
    }, 15000);
  });

  ws.addEventListener('close', (event) => {
    if (heartbeatId !== undefined) {
      window.clearInterval(heartbeatId);
    }
    console.log(
      `[HMR DEBUG] WebSocket CLOSE code=${event.code} reason=${event.reason}`,
    );
  });

  ws.addEventListener('error', (event) => {
    console.log('[HMR DEBUG] WebSocket ERROR', event);
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
