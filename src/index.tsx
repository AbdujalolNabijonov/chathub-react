import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './app/MaterialTheme';
import { BrowserRouter as Router } from "react-router-dom"
import { GlobalContext } from './app/hooks/useGlobals';
import { ContextProvider } from './app/context/Global.context';
import { SocketContextProvider } from './app/context/SocketIO.context';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <ContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Router>
      </ContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
