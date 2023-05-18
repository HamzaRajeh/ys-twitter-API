import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
const container = document.getElementById('root');
const root = createRoot(container);

const darkTheme = createTheme({
  palette: {
    mode:localStorage.getItem('modeTheme')??'light',
  },
});
root.render(
  <ThemeProvider theme={darkTheme}>
<CssBaseline/>
  <React.StrictMode>
     <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
   </React.StrictMode>
   </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
