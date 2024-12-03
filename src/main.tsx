import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {store} from "../store";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./utils/theme.tsx";

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
      <ThemeProvider theme={theme} >
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
    </ThemeProvider>
    </StrictMode>
  )
});
