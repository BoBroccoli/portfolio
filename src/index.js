import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Home/Home'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { GlobalCssMenu } from './GlobalCss/GlobalCssMenu.css';
const theme = createTheme({
    palette: {
        primary: {
            main: '#E4E5E6'
        },
        secondary: {
            main: '#3AA14F'
        },
        bg: {
            main: '#424C55'
        }
    },
    typography: {
        fontFamily: 'sans-serif',
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
    </ThemeProvider>
);

reportWebVitals();
