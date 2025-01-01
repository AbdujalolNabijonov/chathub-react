import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './app/MaterialTheme';
import { BrowserRouter as Router } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
