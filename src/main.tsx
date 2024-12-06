import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from '../store'
import { Provider } from 'react-redux'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { theme } from './utils/theme.tsx'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')!
const root = createRoot(container)

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser.ts')
  return worker.start()
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <GlobalStyles
              styles={{
                '#root': {
                  height: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }
              }}
            />
            <CssBaseline />
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  )
})
