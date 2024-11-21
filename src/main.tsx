import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!;
const root = createRoot(container);

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
});
