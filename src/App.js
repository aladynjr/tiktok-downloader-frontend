import React from 'react';
import './App.scss';
import 'animate.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage';
import Navbar from './components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/Footer';
const theme = createTheme({
  palette: {

    secondary : {
      main : '#b340c2',
      light : '#e673ff',
      dark : '#800080'

    },
    success : {
      main : 'rgb(46, 197, 46)',

    }

  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
<Navbar />
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>

            <Route exact path="/" element={<HomePage />} />



          </Routes>
        </div>
      </BrowserRouter>
      
    </div>

      </ThemeProvider>
  );
}

export default App;
