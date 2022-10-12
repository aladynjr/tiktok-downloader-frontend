import React from 'react';
import './App.scss';
import 'animate.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage';
import DashboardPage from './pages/dashboardpage';
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
    <div className="App">
      <BrowserRouter>
<Navbar />
        <div className="pages">
          <Routes>

            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />



          </Routes>
        </div>
      </BrowserRouter>
      
    </div>

      </ThemeProvider>
  );
}

export default App;
